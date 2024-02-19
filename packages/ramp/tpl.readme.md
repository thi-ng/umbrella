<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/ramp/readme.png)

This package can perform keyframe interpolation for ramps of numeric values,
n-dimensional vectors and nested objects of the same. It provides linear and
cubic hermite interpolation out of the box, but can be extended by implementing
a simple interface to achieve other interpolation methods.

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

### Numeric

```ts tangle:export/readme.ts
import { linear, hermite } from "@thi.ng/ramp";

const rampL = linear([[0.1, 0], [0.5, 1], [0.9, 0]]);
const rampH = hermite([[0.1, 0], [0.5, 1], [0.9, 0]]);

for(let i = 0; i <= 10; i++) {
	const t = i / 10;
    console.log(t, rampL.at(t).toFixed(2), rampH.at(t).toFixed(2));
}

// 0   0.00 0.00
// 0.1 0.00 0.00
// 0.2 0.25 0.16
// 0.3 0.50 0.50
// 0.4 0.75 0.84
// 0.5 1.00 1.00
// 0.6 0.75 0.84
// 0.7 0.50 0.50
// 0.8 0.25 0.16
// 0.9 0.00 0.00
// 1   0.00 0.00
```

### nD vectors

```ts tangle:export/readme-vector.ts
import { HERMITE_V, VEC3, ramp } from "@thi.ng/ramp";
import { FORMATTER } from "@thi.ng/vectors";

// use the generic `ramp()` factory function with a custom implementation
// see: https://docs.thi.ng/umbrella/ramp/interfaces/RampImpl.html
const rgb = ramp(
	// use a vector interpolation preset with the VEC3 API
	HERMITE_V(VEC3),
	// keyframes
	[
		[0.0, [1, 0, 0]], // red
		[0.5, [0, 1, 0]], // green
		[1.0, [0, 0, 1]], // blue
	]
);

for (let i = 0; i <= 20; i++) {
	const t = i / 20;
	console.log(t, FORMATTER(rgb.at(t)));
}

// 0    [1.000, 0.000, 0.000]
// 0.05 [0.972, 0.028, 0.000]
// 0.1  [0.896, 0.104, 0.000]
// 0.15 [0.784, 0.216, 0.000]
// 0.2  [0.648, 0.352, 0.000]
// 0.25 [0.500, 0.500, 0.000]
// 0.3  [0.352, 0.648, 0.000]
// 0.35 [0.216, 0.784, 0.000]
// 0.4  [0.104, 0.896, 0.000]
// 0.45 [0.028, 0.972, 0.000]
// 0.5  [0.000, 1.000, 0.000]
// 0.55 [0.000, 0.972, 0.028]
// 0.6  [0.000, 0.896, 0.104]
// 0.65 [0.000, 0.784, 0.216]
// 0.7  [0.000, 0.648, 0.352]
// 0.75 [0.000, 0.500, 0.500]
// 0.8  [0.000, 0.352, 0.648]
// 0.85 [0.000, 0.216, 0.784]
// 0.9  [0.000, 0.104, 0.896]
// 0.95 [0.000, 0.028, 0.972]
// 1    [0.000, 0.000, 1.000]
```

### Nested objects

```ts tangle:export/readme-nested.ts
import { HERMITE_V, LINEAR_N, VEC2, nested, ramp } from "@thi.ng/ramp";

const r = ramp(
	nested({
		a: LINEAR_N,
		b: nested({
			c: HERMITE_V(VEC2),
		}),
	}),
	[
		[0, { a: 0, b: { c: [100, 100] } }],
		[0.5, { a: 10, b: { c: [300, 50] } }],
		[1, { a: -10, b: { c: [200, 120] } }],
	]
);

// produce an iterator of N uniformly spaced sample points
// across the full range of the ramp
console.log([...r.samples(10)]);

// [
// 	[0, { a: 0, b: { c: [100, 100] } }],
// 	[0.1, { a: 2, b: { c: [120.8, 94.8] } }],
// 	[0.2, { a: 4, b: { c: [170.4, 82.4] } }],
// 	[0.3, { a: 6, b: { c: [229.6, 67.6] } }],
// 	[0.4, { a: 8, b: { c: [279.2, 55.2] } }],
// 	[0.5, { a: 10, b: { c: [300, 50] } }],
// 	[0.6, { a: 6, b: { c: [289.6, 57.28] } }],
// 	[0.7, { a: 2, b: { c: [264.8, 74.64] } }],
// 	[0.8, { a: -2, b: { c: [235.2, 95.36] } }],
// 	[0.9, { a: -6, b: { c: [210.4, 112.72] } }],
// 	[1, { a: -10, b: { c: [200, 120] } }]
// ]
```

### Grouped & nested ramps

```ts tangle:export/readme-group.ts
import { group, linear, wrap } from "@thi.ng/ramp";

const example = group({
	// child timeline with looping behavior
	a: linear([[0, 0], [20, 100]], { domain: wrap }),
	// another child timeline
	b: linear([[10, 100], [90, 200]]),
});

console.log(JSON.stringify([...example.samples(10, 0, 100)]));
// [
// 	[0, { a: 0, b: 100 }],
// 	[10, { a: 50, b: 100 }],
// 	[20, { a: 100, b: 112.5 }],
// 	[30, { a: 50, b: 125 }],
// 	[40, { a: 100, b: 137.5 }],
// 	[50, { a: 50, b: 150 }],
// 	[60, { a: 0, b: 162.5 }],
// 	[70, { a: 50, b: 175 }],
// 	[80, { a: 0, b: 187.5 }],
// 	[90, { a: 50, b: 200 }],
// 	[100, { a: 50, b: 200 }]
// ]
```

<!-- include ../../assets/tpl/footer.md -->
