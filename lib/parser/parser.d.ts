export default function parser(fileInfo: {
    filePath: string;
    source?: string;
}, functions: FunctionType): {
    parse: () => {
        name: keyof typeof functions;
        key: string;
    }[];
};
