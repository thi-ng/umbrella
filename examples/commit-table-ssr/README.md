# commit-table-ssr

[Rendered result](http://demo.thi.ng/umbrella/commit-table-ssr/)

This example demonstrates
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup)-based
server-side rendering and uses a simple
[express](https://expressjs.com/) server to do so. Additionally, an
alternative is shown to generate a static file without requiring a
server setup.

All of the UI components used will also work in the browser without
change, though that part of the example is still forthcoming.

The example builds a large table (~670KB worth) of this repo's 1400+
commits by shelling out to `git` to retrieve and transform the raw
history / log using
[transducer](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
pipelines. Since this process doesn't need to be performed for each
server request, the app uses a
[TLRUCache](https://github.com/thi-ng/umbrella/tree/master/packages/cache#tlru)
to cache the rendered HTML. Reloading the page will show the difference.

To use another local repo on your hard drive, [update the settings
here](./src/config.ts#L24).

```bash
git clone https://github.com/thi-ng/umbrella.git
cd umbrella/examples/commit-table-ssr
yarn install
yarn dev
```

To build the static version run:

```bash
yarn build
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
