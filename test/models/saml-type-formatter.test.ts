import { SamlTypeFormatter } from "../../src/models/saml-type-formatter";

describe("SamlTypeFormatter", () => {
  it("formatTemplate => simple flow", () => {
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

  it("formatTemplate => multiple params with the same name", () => {
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

  it("formatTemplate => keep original types", () => {
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

  it("formatTemplate => missing parameter", () => {
    const template = {
      template: {
        someNumb: "$name",
      },
    };

    expect(() => {
      SamlTypeFormatter.formatTemplate(template, {});
    }).toThrowError(new Error(`Missing 'name' parameter`));
  });

  it("formatTemplate => nested templates", () => {
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

  it("formatTemplate => parameter in list", () => {
    const template = {
      template: {
        someObject: {
          someString: [
            "SomeName",
            "$name"
          ],
        },
      },
    };

    const result = SamlTypeFormatter.formatTemplate(template, {
      name: "Name",
    });

    expect(result).toStrictEqual({
      someObject: {
        someString: [
            "SomeName",
            "Name"
          ],
      },
    });
  });
});
