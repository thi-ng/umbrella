# geom-knn

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-knn.jpg)

[Live demo](http://demo.thi.ng/umbrella/geom-knn/)

Drawing / debug toy based on 2x recursive KNN search using the k-D tree
implementation provided by
[@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel)
package. For each new mouse/touch movement the 1st search pass selects
up to 200 neighboring points. Those points are highlighted in blue. For
each of those a secondary KNN search is performed selecting up to 8
neighbors. These matches are visualized as lines.

Please refer to the [example build
instructions](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions)
on the wiki.

**IMPORTANT:** Please also see the [troubleshooting
note](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions#troubleshooting)
and temporary workaround for this example.

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
