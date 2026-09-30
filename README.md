# Neo browser bundle

Minified browser distribution of Neo plus an editable standalone example.

- Interactive example: <https://vlopezferrando.github.io/neo-browser/embed/semicircle-area/>
- ES module: <https://vlopezferrando.github.io/neo-browser/neo.js>
- Editable example source: [`embed/semicircle-area/figure.js`](embed/semicircle-area/figure.js)

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
