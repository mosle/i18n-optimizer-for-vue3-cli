#!/usr/bin/env node

import fs from "fs";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { program } from "commander";
import cliSpinners from "cli-spinners";
import Table from "cli-table3";
import byteSize from "byte-size";

import * as setting from "./setting";
import * as file from "./file";
import { collectFunctionArgumentsFromFile, createObjectOnlyHasPaths } from "./collector";
import { createTable, addBulk, keysOf, createReport } from "./analyzer";
import { toExample } from "./setting";
import { output, toOutputPath } from "./file";

type Option = {
  setting: string;
};

clear();
console.log(chalk.yellow(figlet.textSync("i18n-optimizer4vue", { horizontalLayout: "full" })));

program.version("0.0.1").description("i18n json optimizer for vue3").option("-s, --setting <setting.json(5)?>", "specify setting json(5) path.", "./i18n-optimizer4vue-settings.json5").parse(process.argv);

const option: Option = program.opts();
const [config, error] = setting.parseSetting({ jsonFilePath: option.setting });
if (error) {
  console.error(chalk.bgRedBright(`[ERROR]`), `${option.setting} is not valid`);
  console.error(chalk.red(error.messages.map((e) => `${e.keyword}:${e.message}`).join("\n")));
  process.exit();
}
if (!config) {
  console.error(chalk.red("unknown error"));
  process.exit();
}

if (!fs.existsSync(config.outputDir)) {
  try {
    fs.mkdirSync(config.outputDir);
  } catch (e) {
    console.error(chalk.bgRedBright(e));
    process.exit();
  }
}

file.clearDirectory(config.outputDir);

const main = async () => {
  const logUpdate = await (await import("log-update")).default;

  let loaderMessage = "";
  const showLoader = () => {
    const dots = cliSpinners.dots12;
    const frames = dots.frames;
    let i = 0;
    return setInterval(() => {
      const frame = frames[(i = ++i % frames.length)];
      logUpdate(`${frame} ${loaderMessage}`);
    }, dots.interval);
  };
  const timer = showLoader();

  const table = createTable();

  config.checkPatterns.forEach((pattern) => {
    console.log(chalk.blue(`exracting ${pattern} `));
    const vueFiles = file.extractAll(pattern);
    console.log(chalk.yellow(`${vueFiles.length} files are matched.`));
    console.log(chalk.blue(`scanning function with`), chalk.bgBlue(`'${toExample(config.targetFunctionNames)}' `));
    vueFiles.forEach((vueFile) => {
      loaderMessage = vueFile;
      const keys = collectFunctionArgumentsFromFile({ filePath: vueFile }, config.targetFunctionNames);
      addBulk(table, keys);
    });
    console.log(chalk.yellow(`${keysOf(table).length} keys are extracted.`));
  });

  const inputPattern = `${config.inputDir}/**/*.json`;
  console.log(chalk.blue(`exracting locale fies with ${inputPattern} `));
  const localeFilePaths = file.extractAll(inputPattern);
  console.log(chalk.yellow(`${localeFilePaths.length} files are found.`));

  console.log(chalk.blue(`generating optimized ${localeFilePaths.length} locale files`));

  const processed: [string, string][] = [];
  localeFilePaths.forEach((path) => {
    loaderMessage = path;

    const jsonString = fs.readFileSync(path, "utf-8");
    const json = JSON.parse(jsonString);
    const optimized = createObjectOnlyHasPaths(json, keysOf(table), config.argumentSeparator);
    const outputPath = toOutputPath(path, config.inputDir, config.outputDir);
    output({ content: JSON.stringify(optimized), path: outputPath });
    processed.push([path, outputPath]);
  });

  clearInterval(timer);
  logUpdate.done();

  console.log(chalk.yellow(`done. saved to ${config.outputDir}`));

  const reportTable = new Table({ head: ["file", "reduced Bytes", "nums of reduced keys"] });
  processed.forEach(([input, output]) => {
    const report = createReport(input, output, config.argumentSeparator);
    reportTable.push([toOutputPath(input, config.inputDir, ""), byteSize(report.reducedBytes).toString(), report.reduecedKeys.length]);
  });
  console.log(`
  [REPORT]`);
  console.log(reportTable.toString());
};

main().catch(console.error);
