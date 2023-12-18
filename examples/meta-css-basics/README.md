# meta-css-basics

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/meta-css-basics.png)

[Live demo](http://demo.thi.ng/umbrella/meta-css-basics/)

## Development mode

Unlike most other examples in this repo, this project requires a different approach during development (i.e. if you want to experiment with the source code):

### MetaCSS transpiler

Open a terminal and start the
[thi.ng/meta-css](https://github.com/thi-ng/umbrella/blob/f92456b8a555f5d09a7ebe95e704caa1d0c6ab6e/packages/meta-css)
transpiler/bundler in watch mode:

```bash
# from the repo root directory
(cd examples/meta-css-basics && yarn css:watch)
```

This command will start watching the [`css/style.meta`
stylesheet](https://github.com/thi-ng/umbrella/blob/develop/examples/meta-css-basics/css/style.meta)
for changes and write the `css/style.css`. This output file is also watched by
Vite and which will then reload everything in the browser...

The `style.meta` file contains further comments, but please also do consult the
[thi.ng/meta-css](https://github.com/thi-ng/umbrella/blob/develop/packages/meta-css)
readme for further guidance.

### Vite dev server

Open a second terminal and start the ViteJS dev server (same as for all the
other examples):

```bash
(cd examples/meta-css-basics && yarn start)
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
