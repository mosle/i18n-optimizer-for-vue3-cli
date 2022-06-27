export declare const parse: ({ filePath, source }: {
    filePath?: string | undefined;
    source?: string | undefined;
}) => {
    script: import("@vue/compiler-sfc").SFCScriptBlock | undefined;
    template: import("@vue/compiler-sfc").SFCTemplateCompileResults | undefined;
};
export declare const parseVue: (source: string) => {
    script: import("@vue/compiler-sfc").SFCScriptBlock | undefined;
    template: import("@vue/compiler-sfc").SFCTemplateCompileResults | undefined;
};
