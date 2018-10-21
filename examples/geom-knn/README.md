# geom-knn

[Live demo](http://demo.thi.ng/umbrella/geom-knn/)

Drawing / debug toy based on 2x recursive KNN search using the k-D tree
implementation provided by
[@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/master/packages/geom-accel)
package. For each new mouse/touch movement the 1st search pass selects
up to 200 neighboring points. Those points are highlighted in blue. For
each of those a secondary KNN search is performed selecting up to 8
neighbors. These matches are visualized as lines.

```bash
git clone https://github.com/thi-ng/umbrella.git
cd umbrella/examples/geom-knn
yarn install
yarn start
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
