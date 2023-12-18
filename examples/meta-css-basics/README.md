# meta-css-basics

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/meta-css-basics.png)

[Live demo](http://demo.thi.ng/umbrella/meta-css-basics/)

## Development mode

Unlike most other examples in this repo, this project requires a different approach during development (i.e. if you want to experiment with the source code):

### MetaCSS transpiler

Open a terminal and use the
[thi.ng/meta-css](https://github.com/thi-ng/umbrella/blob/develop/packages/meta-css)
toolchain to generate the utility classes for a CSS framework, here using the default
specs:

```bash
# from the repo root directory
(cd examples/meta-css-basics && yarn css:gen)
```

This will create a new JSON file (`/css/framework.json`) with hundreds of CSS
class definitions in this example's `/css` directory...

We can then start the transpiler/bundler in watch mode to compile MetaCSS
stylesheets (i.e.
[`/css/style.meta`](https://github.com/thi-ng/umbrella/blob/develop/examples/meta-css-basics/css/style.meta))
to actual CSS, using the just generated framework specs:

```bash
(cd examples/meta-css-basics && yarn css:watch)
```

This command will start watching the [`/css/style.meta`
stylesheet](https://github.com/thi-ng/umbrella/blob/develop/examples/meta-css-basics/css/style.meta)
for changes and write the results to `/css/style.css`. This output file is also
watched by Vite and which will then reload everything in the browser...

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
