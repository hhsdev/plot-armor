const plotArmor = {
  create: config => {
    if (config === undefined) config = new Config({});

    const drawing = new Drawing(600, 600);
    const yAxis = new Axis("vertical", "Y-Axis", drawing, 600, 600, 30, 16, 28, 4, 10, 5);
    const xAxis = new Axis("horizontal", "X-Axis", drawing, 600, 600, 30, 16, 28, 4, 10, 5);
    const graph = new Graph(600, 600, 30, drawing, yAxis, xAxis);
    return graph;
  }
};
