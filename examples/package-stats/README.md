# package-stats

This non-browser example generates several SVG charts of various package
stats in this mono-repo. The charts will be saved in this example's
directory.

```bash
git clone https://github.com/thi-ng/umbrella.git

# first need to build the entire mono-repo
# to produce necessary meta data
yarn install
yarn build:release

# then run example
cd umbrella/examples/package-stats
yarn build
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 - 2025 Karsten Schmidt // Apache Software License 2.0
