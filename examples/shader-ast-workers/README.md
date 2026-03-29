# shader-ast-workers

![screenshot](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/shader-ast-workers.jpg)

[Live demo](http://demo.thi.ng/umbrella/shader-ast-workers/)

This example is using the same raymarching shader from the [shader-ast-raymarch
demo](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/shader-ast-raymarch/),
only here the shader is being transpiled to Javascript only and executed in
parallel using multiple web-workers (orchestrated using
[@thi.ng/rstream](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream)'s Fork-Join mechanism).

In the above image, each worker's slice is tinted in a different color. The line
chart overlays visualize the avg. execution time for each worker.

Please refer to the [example build
instructions](https://codeberg.org/thi.ng/umbrella/wiki/Example-build-instructions)
on the wiki.

## Authors

- Karsten Schmidt

## License

&copy; 2019 - 2025 Karsten Schmidt // Apache Software License 2.0
