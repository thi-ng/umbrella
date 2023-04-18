<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/timestep](https://media.thi.ng/umbrella/banners-20220914/thing-timestep.svg?6570552f)

[![npm version](https://img.shields.io/npm/v/@thi.ng/timestep.svg)](https://www.npmjs.com/package/@thi.ng/timestep)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/timestep.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Managing fixed timestep updates](#managing-fixed-timestep-updates)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Deterministic fixed timestep simulation updates with state interpolation.

For a more thorough description of both the problem and solution, please see
[Glenn Fiedler's article](https://www.gafferongames.com/post/fix_your_timestep/)
upon which this implementation is principally based on.

### Managing fixed timestep updates

The package provides a configurable [`TimeStep`
class](https://docs.thi.ng/umbrella/timestep/classes/TimeStep.html) to manage
the update logic. To participate in these managed updates, the user must provide
callback functions for the two main phases of the frame update:

- `integrate(dt: number, now: number): void`: Depending on actual elapsed time
    and the configured timestep, this function might be called several times per
    update cycle to update the sim to its next desired state to:
    1. Keep a backup of the current state of the sim (from at the beginning of
    that function call). This backup is required for the second phase of the update.
    2. Update the state to the desired next state using the provided timestep
    `dt` (`now` is only given for information).
- `interpolate(alpha: number, now: number): void`: In this phase a
  previously backed up state should be linearly interpolated to the current
  state using the provided `alpha` tween factor and the result stored separately
  such that it can be used for subsequent rendering/display purposes.

In other words, this means any updatable state value will require 3 versions:
previous, current, interpolated. For that reason, the package also provides
wrappers for numeric and vector-based state variables, also illustrated in this
short example below:

```ts tangle:export/readme.ts
import { defTimeStep, defNumeric, defVector } from "@thi.ng/timestep";

// record start time
const startTime = Date.now();

// initialize with default options (dt = 1/60 = 60 fps)
const sim = defTimeStep({ dt: 1/60, startTime });

// update `a` using @ 10 units per second
const a = defNumeric(0, (x, dt) => x + dt * 10);

// update vector `b` using velocity of [-10, 20] (per second)
// also see thi.ng/vectors for hundreds of vector operations...
const b = defVector([0, 0], (x, dt) => [x[0] - 10 * dt, x[1] + 20 * dt]);

// even though the sim will update at a fixed 60fps,
// the simulated render frame rate here is only 25 fps...
setInterval(() => {
    // provide current time and an array of state values (aka IUpdatable impls)
    sim.update((Date.now() - startTime) * 0.001, [a, b]);
    // show current time and interpolated state values
    console.log(sim.current, a.value, b.value);
}, 1000 / 25);

// 0.041  0.243 [ -0.243, 0.486 ]
// 0.082  0.653 [ -0.653, 1.306 ]
// 0.123  1.063 [ -1.063, 2.126 ]
// 0.164  1.473 [ -1.473, 2.946 ]
// 0.205  1.883 [ -1.883, 3.766 ]
// 0.246  2.293 [ -2.293, 4.586 ]
// 0.287  2.703 [ -2.703, 5.406 ]
// 0.328  3.113 [ -3.113, 6.226 ]
// 0.369  3.523 [ -3.523, 7.046 ]
// 0.410  3.933 [ -3.933, 7.866 ]
// 0.451  4.343 [ -4.343, 8.686 ]
// 0.492  4.753 [ -4.753, 9.506 ]
// 0.533  5.163 [ -5.163, 10.326 ]
// 0.575  5.583 [ -5.583, 11.166 ]
// 0.616  5.993 [ -5.993, 11.986 ]
// 0.656  6.393 [ -6.393, 12.786 ]
// 0.698  6.813 [ -6.813, 13.626 ]
// 0.739  7.223 [ -7.223, 14.446 ]
// 0.780  7.633 [ -7.633, 15.266 ]
// 0.822  8.053 [ -8.053, 16.106 ]
// 0.863  8.463 [ -8.463, 16.926 ]
// 0.904  8.873 [ -8.873, 17.746 ]
// 0.945  9.283 [ -9.283, 18.566 ]
// 0.987  9.703 [ -9.703, 19.406 ]
// 1.028 10.113 [ -10.113, 20.226 ]
```

The last row shows that both `a` and `b` have arrived at correct values after 1
second, even though the 25fps used for triggering the updates are not a multiple
of the 60fps used by the sim...

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btimestep%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/timestep
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/timestep"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const timestep = await import("@thi.ng/timestep");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.08 KB

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/timestep/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-timestep,
  title = "@thi.ng/timestep",
  author = "Karsten Schmidt",
  note = "https://thi.ng/timestep",
  year = 2023
}
```

## License

&copy; 2023 Karsten Schmidt // Apache License 2.0
