# shader-ast-workers

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-workers.jpg)

[Live demo](http://demo.thi.ng/umbrella/shader-ast-workers/)

This example is using the same raymarching shader from the [shader-ast-raymarch
demo](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-raymarch/),
only here the shader is being transpiled to Javascript only and executed in
parallel using multiple web-workers (orchestrated using
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)'s Fork-Join mechanism).

In the above image, each worker's slice is tinted in a different color. The line
chart overlays visualize the avg. execution time for each worker.

Please refer to the [example build
instructions](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions)
on the wiki.

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
