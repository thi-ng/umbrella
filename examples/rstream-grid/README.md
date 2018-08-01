# rstream-grid

## About

[Live demo](https://demo.thi.ng/umbrella/rstream-grid/)

Interactive SVG grid pattern creator with undo, local file download and
implemented as rstream dataflow graph, combined with interceptor event &
side effect handling.

- [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/master/packages/atom)
- [@thi.ng/interceptors](https://github.com/thi-ng/umbrella/tree/master/packages/interceptors)
- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom)
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup-svg)
- [@thi.ng/rstream-graph](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-graph)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)

## Building

This example is based on the
[create-hdom-app](https://github.com/thi-ng/create-hdom-app) project
template.

### Development

```bash
git clone https://github.com/thi-ng/umbrella/
cd umbrella/examples/rstream-grid
yarn install
yarn start
```

Installs all dependencies, runs `webpack-dev-server` and opens the app
in your browser.

### Production

```bash
yarn build
```

Builds a minified version of the app and places it in `/public`
directory.

## Authors

- Karsten Schmidt

&copy; 2018