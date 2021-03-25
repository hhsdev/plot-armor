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
  },

  getDefault: (object, path, defaultVal=undefined) => {
    keys = path.split(".");
    if (keys.length == 0) return defaultVal;
    ret = object;
    for (const key of keys) {
      if (ret && Object.hasOwnProperty(ret, key))
        ret = ret[key];
      else
        return defaultVal;
    }
    return ret;
  },
};
export default utils;
