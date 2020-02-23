const utils = {
  getTextMetrics: (text, font) => {
    const textMeasure = document.getElementById("text-measure-util");

    textMeasure.style.font = font;
    textMeasure.innerText = text;

    const height = textMeasure.clientHeight + 1;
    const width = textMeasure.clientWidth + 1;

    return { height, width };
  },

  randomColor: () => {
    const randomColorComponent = () => Math.floor(Math.random() * 256);
    return `rgb(${randomColorComponent()}, ${randomColorComponent()}, ${randomColorComponent()})`;
  }
};
export default utils;
