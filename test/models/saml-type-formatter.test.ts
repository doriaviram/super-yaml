import { SamlTypeFormatter } from "../../src/models/saml-type-formatter";

describe("SamlTypeFormatter", () => {
  it("build => simple flow", () => {
    const template = {
      template: {
        someNumb: 2,
        someString: "$name",
        someStringWithDefault: "$status:Free",
      },
    };

    const result = SamlTypeFormatter.formatTemplate(template, {
      name: "Name",
    });

    expect(result).toStrictEqual({
      someString: "Name",
      someStringWithDefault: "Free",
      someNumb: 2,
    });
  });

  it("build => multiple params with the same name", () => {
    const template = {
      template: {
        someString: "$name",
        someStringWithDefault: "$name",
      },
    };

    const result = SamlTypeFormatter.formatTemplate(template, {
      name: "Name",
    });

    expect(result).toStrictEqual({
      someString: "Name",
      someStringWithDefault: "Name",
    });
  });

  it("build => keep original types", () => {
    const template = {
      template: {
        someNumb: 2,
        someNumbAsString: "2",
        someBool: true,
      },
    };

    const result = SamlTypeFormatter.formatTemplate(template, {});

    expect(result).toStrictEqual({
      someNumb: 2,
      someNumbAsString: "2",
      someBool: true,
    });
  });

  it("build => missing parameter", () => {
    const template = {
      template: {
        someNumb: "$name",
      },
    };

    expect(() => {
      SamlTypeFormatter.formatTemplate(template, {});
    }).toThrowError(new Error(`Missing 'name' parameter`));
  });

  it("build => nested templates", () => {
    const template = {
      template: {
        someObject: {
          someString: "$name",
        },
      },
    };

    const result = SamlTypeFormatter.formatTemplate(template, {
      name: "Name",
    });

    expect(result).toStrictEqual({
      someObject: {
        someString: "Name",
      },
    });
  });
});
