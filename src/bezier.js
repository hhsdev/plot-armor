import Point from "./point";

// Algorithm on http://scaledinnovation.com/analytics/splines/aboutSplines.html
const _calculateControlPoints = (prevPoint, currPoint, nextPoint, tension) => {
  const prevAndCurrDistance = Math.hypot(
    currPoint.x - prevPoint.x,
    currPoint.y - prevPoint.y
  );

  const currAndNextDistance = Math.hypot(
    nextPoint.x - currPoint.x,
    nextPoint.y - currPoint.y
  );

  const prevAndCurrScalingFactor =
    (tension * prevAndCurrDistance) /
    (prevAndCurrDistance + currAndNextDistance);

  if (isNaN(prevAndCurrScalingFactor)) {
    console.log('prevAndCurrScalingFactor is NaN');
  }

  const currAndNextScalingFactor =
    (tension * currAndNextDistance) /
    (currAndNextDistance + currAndNextDistance);

  if (isNaN(currAndNextScalingFactor)) {
    console.log('currAndNextScalingFactor is NaN');
  }

  const prevAndCurrSplinePoint = new Point(
    currPoint.x - prevAndCurrScalingFactor * (nextPoint.x - prevPoint.x),
    currPoint.y - prevAndCurrScalingFactor * (nextPoint.y - prevPoint.y)
  );
  const currAndNextSplinePoint = new Point(
    currPoint.x + currAndNextScalingFactor * (nextPoint.x - prevPoint.x),
    currPoint.y + currAndNextScalingFactor * (nextPoint.y - prevPoint.y)
  );
  return [prevAndCurrSplinePoint, currAndNextSplinePoint];
};

const calculateSplinedPath = (points = []) => {
  const controlPoints = [];

  let prevControlPoint = {};
  for (let i = 1; i < points.length - 1; ++i) {
    const curr = points[i];
    const prev = points[i - 1];
    const next = points[i + 1];

    const [a, b] = _calculateControlPoints(prev, curr, next, 0.4);
    if (isNaN(a.x) || isNaN(a.y)) {
      console.log("a is NaN");
    }
    if (isNaN(b.x) || isNaN(b.y)) {
      console.log("b is NaN");
    }
    prevControlPoint['p1'] = a;
    controlPoints.push(prevControlPoint);
    prevControlPoint = { p0: b };
  }
  controlPoints.push(prevControlPoint);
  return controlPoints;
};

export { calculateSplinedPath };
