const plotArmor = {
  create: config => {
    if (config === undefined) config = new Config({});

    return new Graph(
      config.get("width", 600),
      config.get("height", 600),
      config.get("padding", 30)
    );
  }
};
