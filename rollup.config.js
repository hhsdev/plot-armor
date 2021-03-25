import { terser } from "rollup-plugin-terser";

module.exports = {
  input: ["src/main.js"],
  output: [
    { file: "bundle.js", format: "iife", name: "Graph" },
    {
      file: "bundle.min.js",
      name: "Graph",
      format: "iife",
      plugins: [terser()],
    },
  ],
};
