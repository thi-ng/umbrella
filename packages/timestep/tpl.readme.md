<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

For a more thorough description of both the problem and solution(s), please see
[Glenn Fiedler's article](https://www.gafferongames.com/post/fix_your_timestep/)
upon which this implementation is principally based on.

### Managing fixed timestep updates

The package provides a configurable [`TimeStep`
class](https://docs.thi.ng/umbrella/timestep/classes/TimeStep.html) to manage
the update logic. To participate in these managed updates, the user must provide
state values/wrappers implementing the [`IUpdatable`
interface](https://docs.thi.ng/umbrella/timestep/interfaces/IUpdatable.html) for
the two main phases of the frame update:

- `integrate(dt: number, now: number): void`: Depending on actual elapsed time
	and the configured timestep, this function might be called several times per
	update cycle to update the sim to its next desired state to: 1. Keep a
	backup of the current state of the sim (from at the beginning of that
	function call). This backup is required for the second phase of the update.
	2. Update the state to the desired next state using the provided timestep
	`dt` (`now` is only given for information).
- `interpolate(alpha: number, now: number): void`: In this phase a
  previously backed up state should be linearly interpolated to the current
  state using the provided `alpha` tween factor and the result stored separately
  such that it can be used for subsequent rendering/display purposes.

In other words, this means any updatable state value will require 3 versions:
previous, current, interpolated. Only the interpolated version is to be used for
rendering (or other outside purposes). For that reason, the package also
provides wrappers for
[numeric](https://docs.thi.ng/umbrella/timestep/functions/defNumeric.html) and
[vector-based](https://docs.thi.ng/umbrella/timestep/functions/defVector.html)
state variables, also illustrated in the following short example:

```ts tangle:export/readme.ts
import { defTimeStep, defNumeric, defVector } from "@thi.ng/timestep";

// record start time
const startTime = Date.now();

// initialize with default options (dt = 1/60 = 60 fps)
const sim = defTimeStep({ dt: 1/60, startTime });

// increase `a` using @ 10 units per second
const a = defNumeric(0, (x, dt) => x + dt * 10);

// update vector `b` using velocity of [-10, 20] (per second)
// also see thi.ng/vectors for hundreds of useful vector operations...
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

The last row shows that both `a` and `b` arrive at their expected values after 1
second, even though the 25 fps used for triggering the updates are not a
multiple of the 60 fps used by the sim...

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

TODO

<!-- include ../../assets/tpl/footer.md -->
