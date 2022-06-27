import * as vueSfcParser from "../src/parser/vueSfcParser";

test("generate accessor normally", () => {
  const vue = `
    <script lang="ts" setup>
    const t = useTranslate();
    t("aaa");
    </script>
    <script lang="ts">
    const a = ref(1);
    </script>
    <template>
    <div>{{t("aa")}}<span>a</span></div>
    </template>
    `;
  const { script, template } = vueSfcParser.parse({ source: vue });

  expect(template).not.toBe(undefined);
  expect(script).not.toBe(undefined);
  expect(script?.content).not.toBe(undefined);
});
