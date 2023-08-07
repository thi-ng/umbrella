<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/timestep](https://media.thi.ng/umbrella/banners-20230807/thing-timestep.svg?6570552f)

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

For a more thorough description of both the problem and solution(s), please see
[Glenn Fiedler's article](https://www.gafferongames.com/post/fix_your_timestep/)
upon which this implementation is principally based on.

### Managing fixed timestep updates

The package provides a configurable [`TimeStep`
class](https://docs.thi.ng/umbrella/timestep/classes/TimeStep.html) to manage
the update logic. To participate in these managed updates, the user must provide
state values/wrappers implementing the [`ITimeStep`
interface](https://docs.thi.ng/umbrella/timestep/interfaces/ITimeStep.html) for
the two main phases of the frame update:

- `integrate(dt: number, ctx: ReadonlyTimeStep): void`: Depending on actual
    elapsed time and the configured timestep, this function might be called
    several times per update cycle to update the sim to its next desired state
    to:
    1. Backup the current state of the sim (at the beginning of that function
    call). This backup is required for the second phase of the update.
    2. Update the state to the desired next state using the provided timestep
    `dt` (`ctx` is only given for information).
- `interpolate(alpha: number, ctx: ReadonlyTimeStep): void`: In this phase a
  previously backed up state should be linearly interpolated to the current
  state using the provided `alpha` tween factor and the result stored separately
  such that it can be used for subsequent rendering/display purposes.

In other words, this means any updatable state value will require 3 versions:
previous, current (next), interpolated. **Only the interpolated version is to be
used for rendering (or other userland purposes).** For that reason, the package
also provides wrappers for
[numeric](https://docs.thi.ng/umbrella/timestep/functions/defNumeric.html) and
[vector-based](https://docs.thi.ng/umbrella/timestep/functions/defVector.html)
(arbitrary length and optimized 2D/3D/4D versions) state variables, illustrated
in the following short example:

```ts tangle:export/readme.ts
import { defTimeStep, defNumeric, defVector2 } from "@thi.ng/timestep";
import { maddN2 } from "@thi.ng/vectors";

// initialize with default options (i.e. dt = 1/60 = 60 fps)
// start time is given in milliseconds but will be converted to seconds
// see: https://docs.thi.ng/umbrella/timestep/interfaces/TimestepOpts.html
const sim = defTimeStep({ dt: 1 / 60, startTime: Date.now() });

// define numeric state variable, increase using @ 10 units per second
const a = defNumeric(0, (x, dt) => x + dt * 10);

// define vector state variable, update by applying velocity of [-10, 20] (per second)
// also see thi.ng/vectors for hundreds of other useful vector operations...
// the update function MUST write its result in given vector (1st arg)
const b = defVector2([0, 0], (v, dt) => maddN2(v, [-10, 20], dt, v));

// even though the sim will update at a fixed (theoretical) 60 fps,
// the simulated render frame rate here is only 25 fps...
setInterval(() => {
    // provide current time and an array of state values to update
    // (any ITimeStep impl can be given here, incl. custom types)
    sim.update(Date.now(), [a, b]);
    // show current frame, num updates, time (relative to start) and interpolated state values
    console.log(sim.frame, sim.updates, sim.current, a.value, b.value);
}, 1000 / 25);

// 1   2   0.042 0.253  [ -0.253, 0.506 ]
// 2   4   0.082 0.663  [ -0.663, 1.326 ]
// 3   7   0.124 1.073  [ -1.073, 2.146 ]
// 4   9   0.164 1.483  [ -1.483, 2.966 ]
// 5   12  0.206 1.893  [ -1.893, 3.786 ]
// 6   14  0.246 2.293  [ -2.293, 4.586 ]
// 7   17  0.288 2.713  [ -2.713, 5.426 ]
// 8   19  0.328 3.123  [ -3.123, 6.246 ]
// 9   22  0.371 3.543  [ -3.543, 7.086 ]
// 10  24  0.411 3.953  [ -3.953, 7.906 ]
// 11  27  0.452 4.353  [ -4.353, 8.706 ]
// 12  29  0.493 4.773  [ -4.773, 9.546 ]
// 13  32  0.534 5.173  [ -5.173, 10.346 ]
// 14  34  0.575 5.593  [ -5.593, 11.186 ]
// 15  37  0.617 6.003  [ -6.003, 12.006 ]
// 16  39  0.659 6.423  [ -6.423, 12.846 ]
// 17  42  0.700 6.833  [ -6.833, 13.666 ]
// 18  44  0.740 7.233  [ -7.233, 14.466 ]
// 19  46  0.781 7.643  [ -7.643, 15.286 ]
// 20  49  0.822 8.053  [ -8.053, 16.106 ]
// 21  51  0.861 8.453  [ -8.453, 16.906 ]
// 22  54  0.904 8.873  [ -8.873, 17.746 ]
// 23  56  0.944 9.283  [ -9.283, 18.566 ]
// 24  59  0.986 9.703  [ -9.703, 19.406 ]
// 25  61  1.028 10.113 [ -10.113, 20.226 ]
// ...
```

Since the 25 fps render framerate is not a multiple of the 60 fps used by the
sim, the output shows that for each render frame (1st column), there're either 2
or 3 sim updates performed (2nd column) to accommodate the 60 fps.

This should then also clarify _why_ state interpolation is the final step of
each update cycle: When multiple updates are performed in a single frame, the
sim's state is technically _ahead_ of the render time line and therefore we need
to compute (interpolate) the correct state between previous and current, then
use these interpolated values for rendering (in the abstract sense)...

The last row also shows that both `a` and `b` arrive at their expected values
after 1 second (25 frames)...

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

Package sizes (brotli'd, pre-treeshake): ESM: 816 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

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
