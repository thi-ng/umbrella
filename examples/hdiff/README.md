# hdiff

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdiff.avif)

[Live demo](https://demo.thi.ng/umbrella/hdiff/)

This non-browser example uses [thi.ng/hdiff](https://thi.ng/hdiff) to generate a
self-contained static HTML file of `git diff` output of this monorepo's main
readme file:

```bash
git clone https://github.com/thi-ng/umbrella.git

# if needed, first build the entire mono-repo
yarn install
yarn build

# then run example
cd umbrella/examples/hdiff
yarn build

open dist/index.html
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 - 2025 Karsten Schmidt // Apache Software License 2.0
