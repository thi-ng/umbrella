# commit-heatmap

![screenshot](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/commit-heatmap.png)

This is offline example creates a heatmap visualization of per-package
commits in this mono-repo, but could also be used for other mono-repos
following the [Conventional Commits](https://conventionalcommits.org)
spec. See source code for config options.

## Generating the visualization

The instructions below assume the [entire umbrella repo has already been
built](https://codeberg.org/thi.ng/umbrella/src/branch/develop/README.md#building):

```bash
cd umbrella/examples/commit-heatmap
yarn build
```

The resulting visualization is saved as `heatmap.svg` in the example
folder.

## Authors

- Karsten Schmidt

## License

&copy; 2019 - 2025 Karsten Schmidt // Apache Software License 2.0
