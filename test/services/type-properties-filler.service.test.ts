import { TypePropertiesFillerService } from "../../src/services/type-properties-filler.service";

describe("TypePropertiesFillerService", () => {
  it("build => simple flow", () => {
    const template = {
      properties: {
        someNumb: 2,
        someString: "<% Var(name) %>",
        someStringWithDefault: "<% Var(status,Free) %> ",
      },
    };

    const result = TypePropertiesFillerService.build(template, {
      name: "Name",
    });

    expect(result).toStrictEqual({
      someString: "Name",
      someStringWithDefault: "Free",
      someNumb: 2,
    });
  });

  it("build => string format", () => {
    const template = {
      properties: {
        someString: "Hello <% Var(name) %> !",
      },
    };

    const result = TypePropertiesFillerService.build(template, {
      name: "Name",
    });

    expect(result).toStrictEqual({
      someString: "Hello Name !",
    });
  });

  it("build => multiple params with the same name", () => {
    const template = {
      properties: {
        someString: "<% Var(name) %>",
        someStringWithDefault: "<% Var(name) %>",
      },
    };

    const result = TypePropertiesFillerService.build(template, {
      name: "Name",
    });

    expect(result).toStrictEqual({
      someString: "Name",
      someStringWithDefault: "Name",
    });
  });

  it("build => keep original types", () => {
    const template = {
      properties: {
        someNumb: 2,
        someNumbAsString: "2",
        someBool: true,
        someObj: { a: 2 },
        someArr: ["1"],
        someNull: null,
        someUndefined: undefined,
      },
    };

    const result = TypePropertiesFillerService.build(template, {});

    expect(result).toStrictEqual({
      someNumb: 2,
      someNumbAsString: "2",
      someBool: true,
      someObj: { a: 2 },
      someArr: ["1"],
      someNull: null,
      someUndefined: undefined,
    });
  });

  it("build => missing parameter", () => {
    const template = {
      properties: {
        someNumb: "<% Var(name) %>",
      },
    };

    expect(() => {
      TypePropertiesFillerService.build(template, {});
    }).toThrowError(new Error(`Missing 'name' property`));
  });

  it("build => not supported function", () => {
    const template = {
      properties: {
        someNumb: "<% Wow(name) %>",
      },
    };

    expect(() => {
      TypePropertiesFillerService.build(template, {});
    }).toThrowError(new Error(`Currently only Var function is supported`));
  });

  it("build => nested templates", () => {
    const template = {
      properties: {
        someObject: {
          someString: "<% Var(name) %>",
        },
      },
    };

    const result = TypePropertiesFillerService.build(template, {
      name: "Name",
    });

    expect(result).toStrictEqual({
      someObject: {
        someString: "Name",
      },
    });
  });

  it("build => use objects as param", () => {
    const template = {
      properties: {
        someNumb: 2,
        someObject: "<% Var(obj) %>",
      },
    };

    const result = TypePropertiesFillerService.build(template, {
      obj: {
        wow: "wow",
      },
    });

    expect(result).toStrictEqual({
      someObject: {
        wow: "wow",
      },
      someNumb: 2,
    });
  });
});
