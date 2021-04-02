import { SamlTypeFormatter } from "../../src/models/saml-type-formatter";

describe("SamlTypeFormatter", () => {
  it("build => simple flow", () => {
    const formmater = new SamlTypeFormatter({
      template: {
        someNumb: 2,
        someString: "$name",
        someStringWithDefault: "$status:Free",
      },
    });

    const result = formmater.build({
      name: "Name",
    });

    expect(result).toStrictEqual({
      someString: "Name",
      someStringWithDefault: "Free",
      someNumb: 2,
    });
  });

  it("build => multiple params with the same name", () => {
    const formmater = new SamlTypeFormatter({
      template: {
        someString: "$name",
        someStringWithDefault: "$name",
      },
    });

    const result = formmater.build({
      name: "Name",
    });

    expect(result).toStrictEqual({
      someString: "Name",
      someStringWithDefault: "Name",
    });
  });

  it("build => keep original types", () => {
    const formmater = new SamlTypeFormatter({
      template: {
        someNumb: 2,
        someNumbAsString: "2",
        someBool: true,
      },
    });

    const result = formmater.build({});

    expect(result).toStrictEqual({
      someNumb: 2,
      someNumbAsString: "2",
      someBool: true,
    });
  });

  it("build => missing parameter", () => {
    const formmater = new SamlTypeFormatter({
      template: {
        someNumb: "$name",
      },
    });

    expect(() => {
      formmater.build({});
    }).toThrowError(new Error(`Missing 'name' parameter`));
  });
});
