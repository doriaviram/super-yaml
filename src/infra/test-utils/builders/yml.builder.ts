export class YmlBuilder {
  private data: { [key: string]: any } = {};

  public complexYml(): YmlBuilder {
    this.data = {
      test: {
        test: 2,
      },
      testArr: [
        "one",
        {
          test: 2,
        },
      ],
    };
    return this;
  }

  public build(): { [key: string]: any } {
    return this.data;
  }
}
