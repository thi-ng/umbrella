# hdom-canvas-shapes

[Live demo](http://demo.thi.ng/umbrella/hdom-canvas-shapes/)

This example demonstrates different features of the still unreleased
[@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/master/packages/hdom-canvas)
package to declare canvas scenegraphs using the same hiccup syntax as
the rest of the UI. These shape elements (children of the `canvas`
component) are defined via a SVG-like approach and, using the
branch-local behavior feature of
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom),
are translated into canvas API draw calls. Shapes can be grouped and any
attributes defined on group nodes will be inherited by all children
(same as in SVG).

```bash
git clone https://github.com/thi-ng/umbrella.git
cd umbrella/examples/hdom-canvas-shapes
yarn install
yarn start
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
