import { collectFunctionArgumentsFromFile } from "../src/collector";

const vueComponent = `
<script lang="ts" setup>
const t = useTranslate();
t("__EXAMPLE__0");
</script>
<template>
  <div>{{ t("__EXAMPLE__1") }}</div>
</template>

`;

describe("basic", () => {
  test("", () => {
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 0 });
    expect(keys.length).toEqual(2);
    expect(keys).toContain("__EXAMPLE__0");
    expect(keys).toContain("__EXAMPLE__1");
  });
  test("", () => {
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 0, a: 1 });
    expect(keys.length).toEqual(2);
    expect(keys).toContain("__EXAMPLE__0");
    expect(keys).toContain("__EXAMPLE__1");
  });
  test("", () => {
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 1, a: 1 });
    expect(keys.length).toEqual(0);
    expect(keys).not.toContain("__EXAMPLE__0");
    expect(keys).not.toContain("__EXAMPLE__1");
  });

  test("", () => {
    const vueComponent = `
    <script lang="ts" setup>
    t(1);
    </script>
    <template>
      <div>{{ t("__EXAMPLE__1") }}</div>
    </template>
    
    `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 0 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("__EXAMPLE__1");
  });

  test("", () => {
    const vueComponent = `
      <script lang="ts" setup>
      t("1","2");
      </script>
      <template>
        <div>{{ t(1) }}</div>
      </template>
      
      `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 0 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("1");
  });

  test("", () => {
    const vueComponent = `
        <script lang="ts" setup>
        t("1","2");
        </script>
        <template>
          <div>{{ t(1) }}</div>
        </template>
        
        `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 1 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("2");
  });
  test("", () => {
    const vueComponent = `
          <script lang="ts" setup>
          t("1","2");a.t("1","2");
          </script>
          <template>
            <div>{{ t(1) }}</div>
          </template>
          
          `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 1 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("2");
  });
  test("", () => {
    const vueComponent = `
            <script setup>
            t("1","2");a.t("1","2");
            </script>
            <template>
              <div>{{ t(1) }}</div>
            </template>
            
            `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 1 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("2");
  });

  test("", () => {
    const vueComponent = `
              <script>
              t("1","2");a.t("1","2");
              </script>
              <template>
                <div>{{ t("1") }}{{a.t("1")}}</div>
              </template>
              
              `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 0 });
    expect(keys.length).toEqual(2);
    expect(keys).toContain("1");
  });

  test("", () => {
    const vueComponent = `
                <script>
                t("1","2");b("1","2");
                </script>
                <template>
                  <div>{{ t("1") }}{{b("1")}}</div>
                </template>
                
                `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 0, b: 0 });
    expect(keys.length).toEqual(4);
    expect(keys).toContain("1");
  });

  test("", () => {
    const vueComponent = `
                  <script>
                  \`\${t("1","2")}\`;
                  </script>
                  <template>
                    <div>{{ t("1") }}{{b("1")}}</div>
                  </template>
                  
                  `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 1 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("2");
  });

  test("", () => {
    const vueComponent = `
                    <template>
                      <div>{{ t("1") }}{{b("1")}}</div>
                    </template>
                    
                    `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 0 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("1");
  });
  test("", () => {
    const vueComponent = `
                      <template>
                        <div v-html="t('1')">test</div>
                      </template>
                      
                      `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 0 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("1");
  });

  test("", () => {
    const vueComponent = `
                        <template>
                          <div :data-test="t('1')">{{t("2")}}</div>
                        </template>
                        
                        `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 0 });
    expect(keys.length).toEqual(2);
    expect(keys).toContain("1");
    expect(keys).toContain("2");
  });

  test("", () => {
    const vueComponent = `
                          <template>
                            <div :data-test="t('1')">t("2")</div>
                          </template>
                          
                          `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 0 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("1");
    expect(keys).not.toContain("2");
  });
});
describe("ts", () => {
  test("", () => {
    const vueComponent = `<script lang="ts">
      a = t("a")
      </script>
      `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 0 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("a");
  });
  test("", () => {
    const vueComponent = `<script lang="ts">
      a = t("a" as string)
      </script>
      `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 0 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("a");
  });
  test("", () => {
    const vueComponent = `
    <script lang="ts">
      a = t("a" as string,"b" as string)
      </script>
      `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 1 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("b");
  });
  test("", () => {
    const vueComponent = `
    <script lang="ts">
      a = t("a" as string,"b" as string) as string
      </script>
      `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 1 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("b");
  });
  test("", () => {
    const vueComponent = `
    <script lang="ts">
    type t = {test:1}
      a = t("a" as string,"b" as string)
      </script>
      `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 1 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("b");
  });
});

describe("composition", () => {
  test("", () => {
    const vueComponent = `
            <template>
            <div><OtherComp>{{t("1")}}</OtherComp></div>
            </template>
            `;
    const keys = collectFunctionArgumentsFromFile({ filePath: "_test.vue", source: vueComponent }, { t: 0 });
    expect(keys.length).toEqual(1);
    expect(keys).toContain("1");
  });
});
