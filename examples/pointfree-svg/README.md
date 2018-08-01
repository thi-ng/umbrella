# pointfree-svg

This is a non-interactive demo combining the following packages to generate the SVG graphic below:

- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup)
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup-svg)
- [@thi.ng/pointfree](https://github.com/thi-ng/umbrella/tree/master/packages/pointfree)
- [@thi.ng/pointfree-lang](https://github.com/thi-ng/umbrella/tree/master/packages/pointfree-lang)

![generated result](./output.svg)

Most of the [source code](./src/index.ts) is written in the pointfree
DSL syntax and includes a rudimentary graphics lib to generate SVG
shapes in hiccup format (basically a DOM defined by nested arrays). The
example also demonstrates how to define custom words defined in JS to
easily extend the language.

The generated SVG file will be written in this example's directory...

```bash
git clone https://github.com/thi-ng/umbrella.git
cd umbrella/examples/pointfree-svg
yarn build
```
