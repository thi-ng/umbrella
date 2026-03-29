# thing-packages-quiz

![screenshot](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/thing-packages-quiz.avif)

[Live demo](http://demo.thi.ng/umbrella/thing-packages-quiz/)

## Developing & building

Please refer to the instructions on the wiki:

- [Development](https://codeberg.org/thi.ng/umbrella/wiki/Development-mode-for-examples-using-thi.ng-meta%E2%80%90css)
- [Production build](https://codeberg.org/thi.ng/umbrella/wiki/Example-build-instructions)

### Regenerating the package list

The list of packages used by the quiz is generated from the contents of the repo
`/packages` directory. Run this command to re-generate the source file
`/src/packages.ts`:

```text
yarn tool:packages
```

## Authors

- Karsten Schmidt

## License

&copy; 2024 - 2025 Karsten Schmidt // Apache Software License 2.0
