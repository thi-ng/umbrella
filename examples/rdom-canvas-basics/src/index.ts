import { threadLast } from "@thi.ng/compose";
import { osc, parabolic, sin } from "@thi.ng/dsp";
import { circle, group } from "@thi.ng/geom";
import { $canvas } from "@thi.ng/rdom-canvas";
import { fromRAF } from "@thi.ng/rstream";
import { mapIndexed, take, zip } from "@thi.ng/transducers";
import type { Vec } from "@thi.ng/vectors";

// create subscription for `requestAnimationFrame()` (RAF) events
// transform input timestamps into geometry
const geo = fromRAF().map((time) =>
	// generate geometry...
	threadLast(
		// 1. form coordinates by combining oscillators into tuples (2d points).
		// used like this, the oscillators (and therefore `zip` too) are
		// producing a lazy, but infinite(!) sequence...
		zip(
			// x-axis oscillator (see thi.ng/dsp readme)
			// oscillators are also iterable, hence can be used with zip
			osc(sin, 0.008, 150, 300, time / 300),
			// y-axis oscillator (with different waveform & slightly offset phase)
			osc(parabolic, 0.008, 150, 300, time / 100)
		),
		// 2. only take first N values from the infinite sequence
		[take, 100],
		// 3. convert points into colored circles:
		// unlike in e.g. Processing/p5.js these are **NOT** drawing commands!
		// here we're purely generating 2d shapes, which could be
		// used in many different ways (incl. for drawing to a canvas, as done
		// further below, but at this point there're just data...)
		[
			mapIndexed,
			(i: number, pos: Vec) =>
				circle(
					pos,
					50,
					// colors can be given as plain RGB(A) vectors or CSS strings
					{ stroke: [i * 0.01, 0, i * 0.005] }
				),
		],
		// 4. wrap all shapes into a group shape node
		[
			group,
			// fill canvas w/ background color (see thi.ng/rdom-canvas readme)
			{ __background: "#0ff" },
		]
	)
);

// create & mount reactive canvas component (w/ fixed size).
// this DOM component subscribes to the above geometry stream and
// redraws the canvas with every update/frame...
$canvas(geo, [600, 600]).mount(document.body);
