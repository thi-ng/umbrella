import { argMin, selectThresholdMin } from "@thi.ng/arrays";
import { colorFromRange, css } from "@thi.ng/color";
import { br, button, div, h3 } from "@thi.ng/hiccup-html";
import { SYSTEM, randomID } from "@thi.ng/random";
import { $compile, $klist, $list } from "@thi.ng/rdom";
import { debounce, reactive, sync, syncRAF } from "@thi.ng/rstream";
import { repeatedly } from "@thi.ng/transducers";

type Item = { id: string; aspect: number; color: string };

// generates an array of N random items
const randomItems = (num: number): Item[] => [
	...repeatedly(
		() => ({
			// unique item ID
			id: randomID(8),
			// aspect ratio between 1:3 .. 3:1
			aspect: SYSTEM.minmax(1 / 3, 3),
			// pick random color from color range preset
			// see: https://thi.ng/color readme for details
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
	// vector of vertical column offsets
	const offsets = new Int32Array(cols);
	// column width
	const width = (totalWidth - 2 * margin - (cols - 1) * gap) / cols;
	// return transformation function for single items
	return (item: Item, id: number) => {
		// find colum index with smallest offset
		const column = argMin(offsets);
		// build result object w/ position & size
		const result = {
			x: (margin + column * (width + gap)) | 0,
			y: offsets[column],
			w: width | 0,
			h: (width / item.aspect) | 0,
			id,
			item,
		};
		// update column offset
		offsets[column] += result.h + gap;
		return result;
	};
};

// build a function which selects the correct number of columns for a given
// window width. returns default value (here: 5) if none of the thresholds/breakpoints
// can be matched (i.e. for larger window sizes)
// see: https://docs.thi.ng/umbrella/arrays/functions/selectThresholdMin.html
const columnsForWidth = selectThresholdMin(
	{ 480: 1, 640: 2, 1024: 3, 1280: 4 },
	5
);

// pre-initialize reactive state values
const items = reactive(randomItems(20));
const width = reactive(window.innerWidth);

// update state when window resizes. the delay is needed for iphone orientation switching :(
window.addEventListener("resize", () =>
	setTimeout(() => width.next(window.innerWidth), 50)
);

// combine reactive values/streams. the resulting stream will update each time
// one of the inputs has changed... we debounce the `width` stream to avoid
// unnecessary intermediate DOM updates whilst the browser window is being resized
// (here a min frequency of 10Hz is enforced)
// see: https://thi.ng/rstream readme/docs
const main = sync({ src: { items, width: width.subscribe(debounce(100)) } });

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
				// generate N random new items & update state
				// (which in turn retriggers layout & DOM update)
				{
					onclick: () =>
						items.next(randomItems(SYSTEM.minmaxInt(20, 100))),
				},
				"Randomize items"
			)
		),
		// general purpose list component wrapper which subscribes to reactive
		// `listItems` and transforms each item into a <div>.
		// $klist() is similar to $list(), but uses unique item information to
		// determine if an item has changed (or changed position in the list)
		$klist(
			listItems,
			"div.relative.w-100",
			{},
			({ w, h, id, item }) =>
				div(
					".absolute.flex.items-center",
					{
						// to have each item's position & size tweening to their
						// new values, we add additional subscriptions for each
						// item's `style` attribute. these subs need to be
						// sync'd (delayed) with requestAnimationFrame() so that
						// these subs are not executed for old items when the
						// entire list of items is being replaced...
						style: syncRAF(listItems).map((items) => {
							const { x, y, w, h } = items[id];
							return {
								transition: "all 0.5s ease",
								left: x + "px",
								top: y + "px",
								width: w + "px",
								height: h + "px",
								background: item.color,
							};
						}),
					},
					div(".w-100.tc", {}, `#${id}`, br(), `${w} x ${h}`)
				),
			// lookup function for each item's unique key/ID
			(x) => x.item.id
		)
	)
).mount(document.getElementById("app")!);
