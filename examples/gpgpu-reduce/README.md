# gpgpu-reduce

[Live demo](http://demo.thi.ng/umbrella/gpgpu-reduce/)

## Benchmark results

Using 512x512 input texture @ MBA M1 2020, 16GB

Chrome 126.0.6478.127:

```text
benchmarking: GPU
	warmup... 1.50ms (100 runs)
	total: 111.30ms, runs: 1000 (@ 1 calls/iter)
	freq: 8984.73 ops/sec
	mean: 0.11ms, median: 0.00ms, range: [0.00..40.00]
	q1: 0.00ms, q3: 0.00ms
	sd: 1537.52%

benchmarking: CPU
	warmup... 104.20ms (100 runs)
	total: 1462.30ms, runs: 1000 (@ 1 calls/iter)
	freq: 683.85 ops/sec
	mean: 1.46ms, median: 1.60ms, range: [0.90..1.90]
	q1: 1.10ms, q3: 1.70ms
	sd: 20.89%
```

Firefox 128.0

```text
benchmarking: GPU
	warmup... 1.00ms (100 runs)
	total: 181.00ms, runs: 1000 (@ 1 calls/iter)
	freq: 5524.86 ops/sec
	mean: 0.18ms, median: 0.00ms, range: [0.00..176.00]
	q1: 0.00ms, q3: 0.00ms
	sd: 3073.54%

benchmarking: CPU
	warmup... 116.00ms (100 runs)
	total: 1076.00ms, runs: 1000 (@ 1 calls/iter)
	freq: 929.37 ops/sec
	mean: 1.08ms, median: 1.00ms, range: [0.00..2.00]
	q1: 1.00ms, q3: 1.00ms
	sd: 38.57%
```

## Developing & building

Please refer to the instructions on the wiki:

- [Development](https://github.com/thi-ng/umbrella/wiki/Development-mode-for-examples-using-thi.ng-meta%E2%80%90css)
- [Production build](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions)

## Authors

- Karsten Schmidt

## License

&copy; 2024 Karsten Schmidt // Apache Software License 2.0
