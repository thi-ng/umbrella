# meta-css-basics

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/meta-css-basics.png)

[Live demo](http://demo.thi.ng/umbrella/meta-css-basics/)

## Development mode

**To just run & build this example, use the usual `yarn start` or `yarn build`
and see the [build instructions further below](#building).**

If you want to experiment with the source code and specifically the MetaCSS
styles (`*.mcss` files), this project requires a different approach during
development:

### thi.ng/meta-css transpiler

Open a terminal and use the
[thi.ng/meta-css](https://github.com/thi-ng/umbrella/blob/develop/packages/meta-css)
toolchain to first generate utility classes for a CSS framework and then start
the transpiler/bundler in watch mode to compile MetaCSS stylesheets (e.g.
[`/css/style.mcss`](css/style.mcss)) to actual CSS, using the just generated
framework specs:

```bash
# from the repo root directory
(cd examples/meta-css-basics && yarn css:watch)
```

The first stage of this command will create a new JSON file
(`/css/framework.json`) with hundreds of CSS class definitions & declarations in
this example's `/css` directory...

Secondly, it will start watching all [`/css/*.mcss` stylesheets](css/) for
changes and write transpiled & bundled results to `/css/style.css`. This output
file is also watched by Vite and which will then reload everything in the
browser...

The `style.mcss` file contains further comments, but please also do consult the
[thi.ng/meta-css](https://github.com/thi-ng/umbrella/blob/develop/packages/meta-css)
readme for further guidance.

### Vite dev server

Open a second terminal and start the ViteJS dev server (same as for all the
other examples):

```bash
(cd examples/meta-css-basics && yarn start:only)
```

## Building

Please refer to the [example build instructions](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions) on the wiki.

```bash
(cd examples/meta-css-basics && yarn build)
```

The build command here will also trigger a production build of the CSS
stylesheet...

## Authors

- Karsten Schmidt

## License

&copy; 2023 Karsten Schmidt // Apache Software License 2.0
