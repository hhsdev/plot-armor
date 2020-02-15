function getTextMetrics(text, font) {
  const textMeasure = document.getElementById("text-measure-util");

  textMeasure.style.font = font;
  textMeasure.innerText = text;

  const height = textMeasure.clientHeight + 1;
  const width = textMeasure.clientWidth + 1;

  return { height, width };
}
