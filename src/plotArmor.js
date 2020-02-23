const plotArmor = {
  create: config => {
    if (config === undefined) config = new Config({});

    const drawing = new Drawing(600, 600);
    const graph = new Graph();
    return graph;
  }
};
