import { argMin, selectThresholdMin } from "@thi.ng/arrays";
import { colorFromRange, css } from "@thi.ng/color";
import { br, button, div, h3 } from "@thi.ng/hiccup-html";
import { SYSTEM } from "@thi.ng/random";
import { $compile, $list } from "@thi.ng/rdom";
import { debounce, reactive, sync } from "@thi.ng/rstream";
import { repeatedly } from "@thi.ng/transducers";

type Item = { aspect: number; color: string };

// generates an array of N random items
const randomItems = (num: number): Item[] => [
	...repeatedly(
		() => ({
			// aspect ratio between 1:3 .. 3:1
			aspect: SYSTEM.minmax(1 / 3, 3),
			// pick random color from color range preset
			// https://github.com/thi-ng/umbrella/blob/develop/packages/color/README.md#color-theme-generation
			color: css(colorFromRange("bright")),
		}),
		num
	),
];

// higher order function to distribute items over N columns with given gap and
// horizontal margin. returns new function which transforms a single item and
// augments it with computed position and dimensions.
const columnLayout = (
	cols: number,
	totalWidth: number,
	gap: number,
	margin = 0
) => {
	// vertical column offset vector
	const offsets = new Int32Array(cols);
	// column width
	const width = (totalWidth - 2 * margin - (cols - 1) * gap) / cols;
	return (item: Item, id: number) => {
		// find colum index with smallest offset
		const column = argMin(offsets);
		// build result object w/ position & size
		const res = {
			x: (margin + column * (width + gap)) | 0,
			y: offsets[column],
			w: width | 0,
			h: (width / item.aspect) | 0,
			id,
			item,
		};
		// update column offset
		offsets[column] += res.h + gap;
		return res;
	};
};

// build a function which selects the correct number of columns for a given
// window width. if none of the thresholds/breakpoints match (i.e. for larger
// window sizes), returns the default value (5)
// see: https://docs.thi.ng/umbrella/arrays/functions/selectThresholdMin.html
// prettier-ignore
const columnsForWidth = selectThresholdMin({ 480: 1, 640: 2, 1024: 3, 1280: 4 }, 5);

// reactive state values
const items = reactive(randomItems(20));
const width = reactive(window.innerWidth);

// update state when window resizes. the delay is needed for iphone orientation switching :(
window.addEventListener("resize", () =>
	setTimeout(() => width.next(window.innerWidth), 50)
);

// combine reactive values. the resulting stream will update each time one of
// the inputs has changed... we debounce the `width` stream to avoid unnecessary
// intermediate DOM updates whilst the browser window is being resized (here
// only updates every 100ms are propagated, interim size changes discarded)
const main = sync({
	src: { items, width: width.subscribe(debounce(100)) },
});

// (reactively) transform combined state to compute fully laid out items
const listItems = main.map(({ items, width }) =>
	items.map(columnLayout(columnsForWidth(width), width, 8, 16))
);

// compile & mount reactive UI/DOM
$compile(
	div(
		{},
		div(
			".pa3",
			{},
			h3(".dib.mv0.mr3", {}, "Stacked column layout"),
			button(
				// prettier-ignore
				// generate N random new items & update state
				{ onclick: () => items.next(randomItems(SYSTEM.minmaxInt(20, 100))) },
				"Randomize items"
			)
		),
		// abstract list component which subscribes to reactive `listItems` and
		// transforms each item into a <div>
		$list(listItems, "div.relative.w-100", {}, ({ x, y, w, h, id, item }) =>
			div(
				".absolute.flex.items-center",
				{
					style: {
						top: y + "px",
						left: x + "px",
						width: w + "px",
						height: h + "px",
						background: item.color,
					},
				},
				div(".w-100.tc", {}, `#${id}`, br(), `${w} x ${h}`)
			)
		)
	)
).mount(document.getElementById("app")!);
