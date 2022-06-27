#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = require("commander");
const cli_spinners_1 = __importDefault(require("cli-spinners"));
const cli_table3_1 = __importDefault(require("cli-table3"));
const byte_size_1 = __importDefault(require("byte-size"));
const setting = __importStar(require("./setting"));
const file = __importStar(require("./file"));
const collector_1 = require("./collector");
const analyzer_1 = require("./analyzer");
const setting_1 = require("./setting");
const file_1 = require("./file");
(0, clear_1.default)();
console.log(chalk_1.default.yellow(figlet_1.default.textSync("i18n-optimizer4vue", { horizontalLayout: "full" })));
commander_1.program.version("0.0.1").description("i18n json optimizer for vue3").option("-s, --setting <setting.json(5)?>", "specify setting json(5) path.", "./i18n-optimizer4vue-settings.json5").parse(process.argv);
const option = commander_1.program.opts();
const [config, error] = setting.parseSetting({ jsonFilePath: option.setting });
if (error) {
    console.error(chalk_1.default.bgRedBright(`[ERROR]`), `${option.setting} is not valid`);
    console.error(chalk_1.default.red(error.messages.map((e) => `${e.keyword}:${e.message}`).join("\n")));
    process.exit();
}
if (!config) {
    console.error(chalk_1.default.red("unknown error"));
    process.exit();
}
if (!fs_1.default.existsSync(config.outputDir)) {
    try {
        fs_1.default.mkdirSync(config.outputDir);
    }
    catch (e) {
        console.error(chalk_1.default.bgRedBright(e));
        process.exit();
    }
}
file.clearDirectory(config.outputDir);
const main = async () => {
    const logUpdate = await (await import("log-update")).default;
    let loaderMessage = "";
    const showLoader = () => {
        const dots = cli_spinners_1.default.dots12;
        const frames = dots.frames;
        let i = 0;
        return setInterval(() => {
            const frame = frames[(i = ++i % frames.length)];
            logUpdate(`${frame} ${loaderMessage}`);
        }, dots.interval);
    };
    const timer = showLoader();
    const table = (0, analyzer_1.createTable)();
    config.checkPatterns.forEach((pattern) => {
        console.log(chalk_1.default.blue(`exracting ${pattern} `));
        const vueFiles = file.extractAll(pattern);
        console.log(chalk_1.default.yellow(`${vueFiles.length} files are matched.`));
        console.log(chalk_1.default.blue(`scanning function with`), chalk_1.default.bgBlue(`'${(0, setting_1.toExample)(config.targetFunctionNames)}' `));
        vueFiles.forEach((vueFile) => {
            loaderMessage = vueFile;
            const keys = (0, collector_1.collectFunctionArgumentsFromFile)({ filePath: vueFile }, config.targetFunctionNames);
            (0, analyzer_1.addBulk)(table, keys);
        });
        console.log(chalk_1.default.yellow(`${(0, analyzer_1.keysOf)(table).length} keys are extracted.`));
    });
    const inputPattern = `${config.inputDir}/**/*.json`;
    console.log(chalk_1.default.blue(`exracting locale fies with ${inputPattern} `));
    const localeFilePaths = file.extractAll(inputPattern);
    console.log(chalk_1.default.yellow(`${localeFilePaths.length} files are found.`));
    console.log(chalk_1.default.blue(`generating optimized ${localeFilePaths.length} locale files`));
    const processed = [];
    localeFilePaths.forEach((path) => {
        loaderMessage = path;
        const jsonString = fs_1.default.readFileSync(path, "utf-8");
        const json = JSON.parse(jsonString);
        const optimized = (0, collector_1.createObjectOnlyHasPaths)(json, (0, analyzer_1.keysOf)(table), config.argumentSeparator);
        const outputPath = (0, file_1.toOutputPath)(path, config.inputDir, config.outputDir);
        (0, file_1.output)({ content: JSON.stringify(optimized), path: outputPath });
        processed.push([path, outputPath]);
    });
    clearInterval(timer);
    logUpdate.done();
    console.log(chalk_1.default.yellow(`done. saved to ${config.outputDir}`));
    const reportTable = new cli_table3_1.default({ head: ["file", "reduced Bytes", "nums of reduced keys"] });
    processed.forEach(([input, output]) => {
        const report = (0, analyzer_1.createReport)(input, output, config.argumentSeparator);
        reportTable.push([(0, file_1.toOutputPath)(input, config.inputDir, ""), (0, byte_size_1.default)(report.reducedBytes).toString(), report.reduecedKeys.length]);
    });
    console.log(`
  [REPORT]`);
    console.log(reportTable.toString());
};
main().catch(console.error);
