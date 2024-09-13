import { contrast, css, srgb } from "@thi.ng/color";
import { div, inputColor } from "@thi.ng/hiccup-html";
import {
	defs,
	group,
	line,
	pattern,
	rect,
	svg,
	text,
} from "@thi.ng/hiccup-svg";
import { fit } from "@thi.ng/math";
import { $compile, $input, $replace } from "@thi.ng/rdom";
import { reactive, sync } from "@thi.ng/rstream";
import {
	comp,
	iterator,
	mapIndexed,
	normRange3d,
	partition,
} from "@thi.ng/transducers";

// num luminance steps
const L = 5;
// num columns
const COLS = L + 1;
// column width
const W = 200;
// row height
const H = COLS * 20 + 2;

// reactive state
const col1 = reactive("#000000");
const col2 = reactive("#ffffff");
const inputs = sync({ src: { col1, col2 } });

// main swatch visualization:
// generates a SVG document in hiccup format based on current color selection
const main = inputs.map(({ col1, col2 }) =>
	svg(
		{
			width: COLS * W,
			height: COLS * H,
			"font-family": "Menlo, monospace",
			"font-size": "14px",
		},
		defs(
			pattern(
				{ id: "hatch", viewBox: "0 0 5 5", width: "2%", height: "20%" },
				line([0, 0], [10, 10], { stroke: "#fff" })
			)
		),
		iterator(
			comp(
				// chunk into groups of COLS colors
				partition(COLS),
				mapIndexed((id, chunk) =>
					// create a group node for each chunk of colors
					// arrange as grid, based on running chunk index
					group(
						{ translate: [(id % COLS) * W, ((id / COLS) | 0) * H] },
						// create individual swatches for each RGB tuple
						...mapIndexed((i, color) => {
							const col = srgb(color);
							const colA = srgb(col1);
							const colB = srgb(col2);
							// compute contrast with background for both color choices
							const ca = contrast(col, colA);
							const cb = contrast(col, colB);
							const maxC = Math.max(ca, cb);
							// select color with higher contrast
							const fill = ca > cb ? colA : colB;
							return group(
								// reduce opacity if max contrast < WCAG threshold
								maxC < 4.5
									? { opacity: fit(maxC, 1, 4.5, 0.2, 1) }
									: {},
								rect([0, i * 20], W - 2, 20, { fill: col }),
								// show hatch overlay if max contrast < WCAG threshold
								maxC < 4.5
									? rect([0, i * 20], W - 2, 20, {
											fill: "url(#hatch)",
									  })
									: null,
								// text label
								text(
									[10, i * 20 + 11],
									`${css(col)}: ${ca.toFixed(1)}/${cb.toFixed(
										1
									)}`,
									{ fill, "dominant-baseline": "middle" }
								)
							);
						}, chunk)
					)
				)
			),
			// 3D iterator of normalized values in [0,1] range
			// yields sequence: [0,0,0], [1/L,0,0], [2/L,0,0] ... [1, 1, 1]
			normRange3d(L, L, L)
		)
	)
);

// define & mount reactive DOM/UI
$compile(
	div(
		{},
		// reactive color choosers
		div(
			"#controls",
			{},
			inputColor({ value: col1, oninput: $input(col1) }),
			inputColor({ value: col2, oninput: $input(col2) })
		),
		// wrap SVG in `$replace()` so that entire element will be replaced on change
		$replace(main)
	)
).mount(document.getElementById("app")!);
