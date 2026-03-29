# thing-browser

![screenshot](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/thing-browser.avif)

[Live demo](http://demo.thi.ng/umbrella/thing-browser/)

## Developing & building

Please refer to the instructions on the wiki:

- [Development](https://codeberg.org/thi.ng/umbrella/wiki/Development-mode-for-examples-using-thi.ng-meta%E2%80%90css)
- [Production build](https://codeberg.org/thi.ng/umbrella/wiki/Example-build-instructions)

### Regenerating the package list

The list of packages and their tags is generated from the contents of the repo
`/packages` directory. Before running this example locally, you must first run
the following command to (re)generate the index file `/src/packages.json`:

```text
yarn tool:packages
```

## Authors

- Karsten Schmidt

## License

&copy; 2024 - 2025 Karsten Schmidt // Apache Software License 2.0
