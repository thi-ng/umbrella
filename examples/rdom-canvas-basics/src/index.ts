import { circle, group } from "@thi.ng/geom";
import { $canvas } from "@thi.ng/rdom-canvas";
import { fromRAF } from "@thi.ng/rstream";
import { repeatedly } from "@thi.ng/transducers";

// create geometry stream/subscription
const geo = fromRAF().map((t) =>
	// shape group w/ attribs
	group(
		{
			// fill canvas w/ background color (see readme)
			__background: "#0ff",
		},
		[
			// create 10 circles
			...repeatedly(
				(i) =>
					circle(
						[
							Math.sin(t * 0.01 + i * 0.5) * 150 + 300,
							Math.sin(t * 0.03 + i * 0.5) * 150 + 300,
						],
						50,
						// colors can be given as RGBA vectors or CSS
						{ fill: [i * 0.1, 0, i * 0.05] }
					),
				10
			),
		]
	)
);

// create & mount canvas component (w/ fixed size)
$canvas(geo, [600, 600]).mount(document.getElementById("app")!);
