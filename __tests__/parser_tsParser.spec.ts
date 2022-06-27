import * as parser from "../src/parser/tsParser";

describe("findNodesByFuncNames", () => {
  test("test", () => {
    const code = `
    const t = function(){};
    t("a","b");

    `;
    const funcs = parser?.findNodesByFuncNames(["t"], parser?.parse(code));
    expect(funcs).toBeInstanceOf(Array);
    expect(funcs?.length).toEqual(1);
  });

  test("test", () => {
    const code = `
      const aa = function(){};
      aa("a","b");
        aa("c")
      `;
    const funcs = parser?.findNodesByFuncNames(["aa"], parser?.parse(code));
    expect(funcs).toBeInstanceOf(Array);
    expect(funcs?.length).toEqual(2);
  });
});
describe("findNodesByFuncNamesWithArgumentTypes", () => {
  test("test", () => {
    const code = `
        const aa = function(){};
        aa("a","b");
          aa("c")
        `;
    const funcs = parser?.findNodesByFuncNamesWithArgumentTypes([{ name: "aa", argumentIndex: 0, type: "string" }], parser?.parse(code));
    expect(funcs).toBeInstanceOf(Array);
    expect(funcs?.length).toEqual(2);
  });

  test("test", () => {
    const code = `
          const aa = function(){};
          aa("a","b");
            aa("c")
          `;
    const funcs = parser?.findNodesByFuncNamesWithArgumentTypes([{ name: "aa", argumentIndex: 1, type: "string" }], parser?.parse(code));
    expect(funcs).toBeInstanceOf(Array);
    expect(funcs?.length).toEqual(1);
  });

  test("test", () => {
    const code = `
            const aa = function(){};
            aa("a","b");
              aa("c")
            `;
    const funcs = parser?.findNodesByFuncNamesWithArgumentTypes([{ name: "aa", argumentIndex: 1, type: "number" }], parser?.parse(code));
    expect(funcs).toBeInstanceOf(Array);
    expect(funcs?.length).toEqual(0);
  });

  test("test", () => {
    const code = `
            const aa = function(){};
            aa("a","b");
              aa("c")
            `;
    const funcs = parser?.findNodesByFuncNamesWithArgumentTypes([{ name: "aa", argumentIndex: 2, type: "string" }], parser?.parse(code));
    expect(funcs).toBeInstanceOf(Array);
    expect(funcs?.length).toEqual(0);
  });

  test("test", () => {
    const code = `
              const aa = function(){};
              aa("a","b");
                aa("c")
              `;
    const funcs = parser?.findNodesByFuncNamesWithArgumentTypes([{ name: "aaa", argumentIndex: 0, type: "string" }], parser?.parse(code));
    expect(funcs).toBeInstanceOf(Array);
    expect(funcs?.length).toEqual(0);
  });
});

describe("findNodesByMethodNamesWithArgumentTypes", () => {
  test("test", () => {
    const code = `
        const _ctx = {aa:function(){}};
        _ctx.aa("a","b");
          _ctx.aa("c")
        `;
    const funcs = parser?.findNodesByMethodNamesWithArgumentTypes("_ctx", [{ name: "aa", argumentIndex: 0, type: "string" }], parser?.parse(code));
    expect(funcs).toBeInstanceOf(Array);
    expect(funcs?.length).toEqual(2);
  });

  test("test", () => {
    const code = `
        _ctx.aa("a","b");
          _ctx.aa("c")
        `;
    const funcs = parser?.findNodesByMethodNamesWithArgumentTypes("_not_found", [{ name: "aa", argumentIndex: 0, type: "string" }], parser?.parse(code));
    expect(funcs).toBeInstanceOf(Array);
    expect(funcs?.length).toEqual(0);
  });
  test("test", () => {
    const code = `
        _ctx.aa("a","b");
          _ctx.NG("c")
        `;
    const funcs = parser?.findNodesByMethodNamesWithArgumentTypes("_ctx", [{ name: "aa", argumentIndex: 0, type: "string" }], parser?.parse(code));
    expect(funcs).toBeInstanceOf(Array);
    expect(funcs?.length).toEqual(1);
  });
  test("test", () => {
    const code = `
        _ctx.aa("a","b");
          _ctx.aa("c")
        `;
    const funcs = parser?.findNodesByMethodNamesWithArgumentTypes("_ctx", [{ name: "aa", argumentIndex: 1, type: "string" }], parser?.parse(code));
    expect(funcs).toBeInstanceOf(Array);
    expect(funcs?.length).toEqual(1);
  });

  test("test", () => {
    const code = `
        _ctx.aa("a","b");
          _ctx.aaa("c")
        `;
    const funcs = parser?.findNodesByMethodNamesWithArgumentTypes("_ctx", [{ name: "aaa", argumentIndex: 1, type: "string" }], parser?.parse(code));
    expect(funcs).toBeInstanceOf(Array);
    expect(funcs?.length).toEqual(0);
  });
  test("test", () => {
    const code = `
        _ctx.aa("a","b");
          _ctx.aaa("c")
        `;
    const funcs = parser?.findNodesByMethodNamesWithArgumentTypes("_ctx", [{ name: "b", argumentIndex: 1, type: "string" }], parser?.parse(code));
    expect(funcs).toBeInstanceOf(Array);
    expect(funcs?.length).toEqual(0);
  });
});
