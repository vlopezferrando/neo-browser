// This source is intentionally unminified: copy it and adjust colors, labels,
// camera, or construction details for the page where you embed the figure.
import { Figure, format } from '../../neo.js';

const fig = new Figure();

const ink = '#26344a';
const blue = '#2e6fa3';
const blueFill = '#a9cee7';
const orange = '#c46831';
const paper = '#fffdf8';

// The diameter line and the fixed center O of the large semicircle.
const O = fig.point.fixed(0, 0, { visible: false });
const axisPoint = fig.point.fixed(1, 0, { visible: false });
const baseLine = fig.line.throughPoints(O, axisPoint, { visible: false });

// Drag A vertically at the left endpoint of the chord. Translating A by 20
// gives B, so the horizontal chord keeps its stated length while it moves.
const verticalBase = fig.point.fixed(-10, 0, { visible: false });
const verticalPoint = fig.point.fixed(-10, 1, { visible: false });
const verticalRay = fig.ray.fromPoints(verticalBase, verticalPoint, { visible: false });
const { point: A } = fig.point.onPath(verticalRay, {
  at: [-10, 7],
  style: { fill: blue, stroke: '#ffffff', strokeWidth: 2, pointRadius: 7 },
});
const B = fig.transform.translated(A, [20, 0], { visible: false });
const tangentLine = fig.line.parallelThrough(baseLine, A, { visible: false });
const H = fig.point.projectionOnto(O, tangentLine, { visible: false });
const r = fig.scalar.distance(O, H);

// OA is the large radius, so Pythagoras gives R² = r² + 10².
const R = fig.scalar.distance(O, A);
const largeCircle = fig.circle.fromCenterRadius(O, R, { visible: false });
const largeRight = fig.point.intersect(largeCircle, baseLine, { near: [30, 0], visible: false });
const largeLeft = fig.point.intersect(largeCircle, baseLine, { near: [-30, 0], visible: false });

// The small center may move horizontally, but only as far as keeps its
// semicircle inside the large one.
const centerLimit = fig.scalar.fn((large, small) => large - small, R, r);
const limitCircle = fig.circle.fromCenterRadius(O, centerLimit, { visible: false });
const limitRight = fig.point.intersect(limitCircle, baseLine, { near: [30, 0], visible: false });
const limitLeft = fig.point.intersect(limitCircle, baseLine, { near: [-30, 0], visible: false });
const centerTrack = fig.segment.between(limitLeft, limitRight, { visible: false });
const { point: C } = fig.point.onPath(centerTrack, {
  t: 0.68,
  label: 'C',
  style: { fill: orange, stroke: '#ffffff', strokeWidth: 2, pointRadius: 7 },
});

const smallCircle = fig.circle.fromCenterRadius(C, r, { visible: false });
const smallRight = fig.point.intersect(smallCircle, baseLine, { near: [30, 0], visible: false });
const smallLeft = fig.point.intersect(smallCircle, baseLine, { near: [-30, 0], visible: false });

// Drawing order makes the small white sector cut out the large blue sector.
fig.sector.fromCenterStartEnd(O, largeLeft, largeRight, {
  style: {
    fill: blueFill,
    fillOpacity: 0.72,
    stroke: blue,
    strokeWidth: 3,
    sectorRadii: { strokeOpacity: 0 },
  },
});
fig.sector.fromCenterStartEnd(C, smallLeft, smallRight, {
  style: {
    fill: paper,
    fillOpacity: 1,
    stroke: orange,
    strokeWidth: 3,
    sectorRadii: { strokeOpacity: 0 },
  },
});

const diameter = fig.segment.between(largeLeft, largeRight, {
  style: { stroke: ink, strokeWidth: 2 },
});
// The proof triangle OAB is split by the perpendicular OH into two congruent
// right triangles. In either half, the legs have lengths r and 10 and the
// hypotenuse has length R.
fig.polygon.from([O, A, B], {
  style: { fill: blue, fillOpacity: 0.1, stroke: blue, strokeWidth: 1.5 },
});
const chord = fig.segment.between(A, B, {
  style: { stroke: orange, strokeWidth: 4 },
});
const largeRadius = fig.segment.between(O, A, {
  style: { stroke: blue, strokeWidth: 2, strokeDash: 'dashed' },
});
fig.segment.between(O, B, {
  style: { stroke: blue, strokeWidth: 2, strokeDash: 'dashed' },
});
const verticalLeg = fig.segment.between(O, H, {
  style: { stroke: orange, strokeWidth: 2, strokeDash: 'dashed' },
});
const halfChord = fig.segment.between(A, H, { visible: false });
fig.angle.between(O, H, B, {
  radius: 1.1,
  style: { fill: orange, fillOpacity: 0.15, stroke: orange, strokeWidth: 1.5 },
});
const tangency = fig.point.projectionOnto(C, tangentLine, {
  style: { fill: orange, stroke: paper, strokeWidth: 2, pointRadius: 5 },
});
const smallRadius = fig.segment.between(C, tangency, {
  style: { stroke: orange, strokeWidth: 2, strokeDash: 'dashed' },
});

fig.text.label(chord, String.raw`20`, {
  format: 'latex',
  offsetPx: [0, 24],
  style: { fill: ink, fontSize: 16 },
});
fig.text.label(halfChord, String.raw`10`, {
  format: 'latex',
  offsetPx: [0, -18],
  style: { fill: orange, fontSize: 15 },
});
fig.text.label(largeRadius, String.raw`R`, {
  format: 'latex',
  offsetPx: [-10, -10],
  style: { fill: blue, fontSize: 18 },
});
fig.text.label(verticalLeg, String.raw`r`, {
  format: 'latex',
  offsetPx: [14, 0],
  style: { fill: orange, fontSize: 18 },
});

const roundedR = fig.scalar.fn((value) => Math.round(value * 100) / 100, R);
const roundedr = fig.scalar.fn((value) => Math.round(value * 100) / 100, r);
const invariant = fig.scalar.fn((large, small) => Math.round((large * large - small * small) * 100) / 100, R, r);
const k = fig.scalar.fn((value) => value / 2, invariant);

fig.text.viewport(0.025, 0.04, format`R = ${roundedR} cm   ·   r = ${roundedr} cm`, {
  xAnchor: 'left', yAnchor: 'top', style: { fill: ink, fontSize: 16 },
});
fig.text.viewport(0.025, 0.10, format`R² − r² = ${invariant}`, {
  xAnchor: 'left', yAnchor: 'top', style: { fill: blue, fontSize: 18 },
});
fig.text.viewport(0.025, 0.17, format`Àrea pintada = ${k}π cm²`, {
  xAnchor: 'left', yAnchor: 'top', style: { fill: orange, fontSize: 18 },
});

fig.render('#semicircle-figure', {
  renderer: 'svg',
  camera: { center: [0, -6], zoom: 24 },
  grid: 'none',
  controls: false,
  interactive: true,
  accessibility: {
    label: 'Àrea entre dos semicercles',
    description: 'Arrossega el punt blau vertical per canviar els radis i el punt taronja horitzontal per desplaçar el semicercle petit.',
  },
});
