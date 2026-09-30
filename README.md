# Neo browser bundle

Minified browser distribution of Neo plus an editable standalone example.

- Interactive example: <https://vlopezferrando.github.io/neo-browser/embed/semicircle-area/>
- ES module: <https://vlopezferrando.github.io/neo-browser/neo.js>
- Editable example source: [`embed/semicircle-area/figure.js`](embed/semicircle-area/figure.js)

To add the complete semicircle figure to a page, create its container and load
the editable construction directly:

```html
<div id="semicircle-figure" style="width: 100%; min-height: 540px"></div>
<script
  type="module"
  src="https://vlopezferrando.github.io/neo-browser/embed/semicircle-area/figure.js"
></script>
```

To create your own figure, import the minified Neo module instead:

```html
<div id="figure"></div>
<script type="module">
  import { Figure } from 'https://vlopezferrando.github.io/neo-browser/neo.js';

  const fig = new Figure();
  const center = fig.point.free(0, 0);
  fig.circle.fromCenterRadius(center, 4);
  fig.render('#figure');
</script>
```

The MathJax chunk beside `neo.js` is loaded lazily only when LaTeX text is used.
