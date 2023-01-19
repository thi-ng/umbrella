# geom-knn-hash

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-knn-hash.jpg)

[Live demo](http://demo.thi.ng/umbrella/geom-knn-hash/)

2x recursive KNN search visualization using the hash grid implementation
provided by
[@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel)
package. For each mouse/touch movement the 1st search pass selects up to 2048
neighboring points. Those points are highlighted in blue. For each of those a
secondary KNN search is performed selecting up to 4 neighbors. These matches are
visualized as lines.

Please refer to the [example build
instructions](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions)
on the wiki.

**IMPORTANT:** Please also see the [troubleshooting
note](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions#troubleshooting)
and temporary workaround for this example.

## Authors

- Karsten Schmidt

## License

&copy; 2023 Karsten Schmidt // Apache Software License 2.0
