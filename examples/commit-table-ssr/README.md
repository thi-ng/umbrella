# commit-table-ssr

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/commit-table-ssr.png)

[Live version](http://demo.thi.ng/umbrella/commit-table-ssr/)

This example demonstrates isomorphic,
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)-based
server-side rendering, static file generation and an extended
interactive browser version of a git repo commit log. The server is a
simple [express](https://expressjs.com/) app.

There're 3 versions in this example:

1) A server app which generates a static HTML version of the commit
   table, performs caching and provides a route for retrieving
   the commits as JSON. This server also includes the [Parcel
   middleware](https://parceljs.org/api.html#middleware) to allow
   editing the client without having to restart the server.
2) A browser app which constructs the table client-side from the JSON
   version of the commits
3) A node app which generates a static HTML file

All of the UI components used on the server side too work in the browser
without change, though the browser version has additional functionality
(i.e. interactive filtering of commits via user provided search filter).

The server example builds a large table (~700KB worth of HTML) of this
repo's 1460+ commits by shelling out to `git` to retrieve and transform
the raw history / log using
[transducer](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
pipelines. Since this process doesn't need to be performed for each
server request, the app uses
[TLRUCaches](https://github.com/thi-ng/umbrella/tree/develop/packages/cache#tlru)
to cache both the raw commits and the rendered HTML. Reloading the page
will show the timing difference.

To use another local repo on your hard drive, [update the settings
here](./src/common/config.ts#L24).

## Building & running

### Server-side rendering

See [/src/server/index.ts](./src/server/index.ts) for details...

```bash
git clone https://github.com/thi-ng/umbrella.git
cd umbrella/examples/commit-table-ssr
yarn install
yarn start
```

Then open http://localhost:8080/ssr in your browser.

### Browser version

The browser version uses the same UI components, but realizes them via
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom).

In addition to the SSR version above, this version displays additional
repo stats and allows for interactive filtering of the commits. The
commits themselves are loaded as JSON which are provided by the server
app above.

Furthermore, this version utilizes
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
to build a simple dataflow graph and handle app state changes via
various reactive stream constructs. Comments are included.

See [/src/client/index.ts](./src/client/index.ts) for details...

```
yarn start
```

Once you see a message that the server is running and the client app has
been built, open http://localhost:8080 in your browser.

### Static file generation

The result will be saved to `table.html` in this example's root directory.

See [/src/server/static.ts](./src/server/static.ts) for details...

```bash
yarn build-static
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
