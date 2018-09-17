# hdom-canvas-clock

[Live demo](http://demo.thi.ng/umbrella/hdom-canvas-clock/)

Declarative canvas drawing using the upcoming
[@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom-canvas)
package.

Related examples:

- [hdom-canvas-shapes](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-shapes)

## Building

Because some of the packages used by this demo are still unreleased,
it's currently only possible to build from source...

The example project also assumes that [Parcel](https://parceljs.org) is
installed globally.

```bash
git clone https://github.com/thi-ng/umbrella.git
cd umbrella
git checkout feature/hdom-canvas
yarn install
yarn build
cd examples/hdom-canvas-clock
yarn start
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
