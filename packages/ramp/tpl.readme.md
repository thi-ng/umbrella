<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/ramp/readme.png)

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

### Numeric ramps

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

### nD Vector ramps

```ts tangle:export/readme-vector.ts
import { HERMITE_V, ramp } from "@thi.ng/ramp";
import { FORMATTER, VEC3 } from "@thi.ng/vectors";

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

<!-- include ../../assets/tpl/footer.md -->
