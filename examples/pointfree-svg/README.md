# pointfree-svg

![screenshot](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/pointfree-svg.png)

This is a non-browser demo combining the following packages to generate the
above SVG graphic:

- [@thi.ng/hiccup](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup)
- [@thi.ng/hiccup-svg](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup-svg)
- [@thi.ng/pointfree](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/pointfree)
- [@thi.ng/pointfree-lang](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/pointfree-lang)

Most of the [source
code](https://codeberg.org/thi.ng/umbrella/media/branch/develop/examples/pointfree-svg/src/index.ts)
is written in the pointfree DSL syntax and includes a rudimentary
graphics lib to generate SVG shapes in hiccup format (basically a DOM
defined by nested arrays). The example also demonstrates how to define
custom words defined in JS to easily extend the language.

The generated SVG file will be written in this example's directory...

```bash
git clone https://codeberg.org/thi.ng/umbrella.git
cd umbrella/examples/pointfree-svg
yarn install
yarn build
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 - 2025 Karsten Schmidt // Apache Software License 2.0
