import {
	anchor,
	button,
	div,
	img,
	inputRange,
	label,
	para,
	strong,
} from "@thi.ng/hiccup-html";
import { parse } from "@thi.ng/hiccup-markdown";
import { $inputNum, $list } from "@thi.ng/rdom";
import { fromDOMEvent, reactive, sync } from "@thi.ng/rstream";
import { maybeParseInt } from "@thi.ng/strings";
import { comp, interpose, iterator, map } from "@thi.ng/transducers";
import type { LayoutItem, RankedItem } from "./api.js";
import { DB } from "./data.js";
import INTRO from "./intro.md?raw";
import { columnLayout, columnsForWidth } from "./layout.js";

// component function for the `gallery` app state (i.e. the main part of the app)
export const gallery = async () => {
	// reactive wrapper for window width (minus margins)
	const width = fromDOMEvent(window, "resize", false, { init: <any>{} }).map(
		() => window.innerWidth - 2 * 16
	);
	// reactive wrapper for total column layout height
	// (used to adjust footer position)
	const height = reactive(0);

	// minimum similarity threshold for related images
	const threshold = reactive(0.33);

	// reactive state of currently selected image (or -1 to select all)
	// attempt to initialize from hash fragment...
	const selected = reactive<number>(
		maybeParseInt(location.hash.substring(1), -1)
	);

	// combine reactive values required for computing related items
	const related = sync({
		src: { selected, threshold },
	}).map(({ selected: sel, threshold }) =>
		sel < 0
			? // return full set if no image selected
			  DB.map((x, i) => <RankedItem>[x, i, -1])
			: // compute similarities to selected image
			  // this is the actual Jaccard index calculation
			  // see: https://docs.thi.ng/umbrella/bitfield/classes/BitField.html#similarity
			  // prettier-ignore
			  DB.map((x, i) => <RankedItem>[x, i, DB[sel].encoded!.similarity(DB[i].encoded!)])
					// discard unrelated items
					.filter((x) => x[2] >= threshold)
					// sort remaining by similarity (in best-to-worst order)
					.sort((a, b) => b[2] - a[2])
	);

	// next compute the new layout for selected/related items. separating this
	// step from the above allows us to be more lazy and save energy, since we
	// don't have to recompute similarities if only the window size changes
	const layoutItems = sync({
		src: { related, width },
	}).map(({ related, width }) => {
		// configure layout params
		const layout = columnLayout({
			cols: columnsForWidth(width),
			width,
			gap: 8,
			extraHeight: 72,
			snap: 72,
		});
		// compute layout info for each item
		const result = related.map(layout.fn);
		// update total height
		height.next(layout.height());
		return result;
	});

	// component function for a single image (with already precomputed layout info)
	const imageItem = ({ x, y, w, h, item }: LayoutItem) => {
		// lookup tags of selected image (these will be used for highlighting)
		const selID = selected.deref()!;
		const selectedTags = selID >= 0 ? DB[selID].tags : [];
		// build transducer to highlight tags shared with selected image
		const tagXform = comp(
			map((x: string) => (selectedTags.includes(x) ? strong({}, x) : x)),
			interpose(" ")
		);
		const [{ url, tags }, id, score] = item;
		return div(
			".absolute.pa0",
			{
				style: {
					left: px(x),
					top: px(y),
					width: px(w),
					height: px(h),
				},
			},
			div(
				".bg-white.pa2.h-100",
				{},
				anchor(
					{
						href: "#" + id,
						onclick: () => selected.next(id),
					},
					img(".w-100", { src: url, alt: "Sorry, no alt text" })
				),
				// display tags and similarity score
				div(".mt2", {}, iterator(tagXform, tags)),
				score >= 0 ? div({}, "score: ", score.toFixed(2)) : null
			)
		);
	};

	// parse markdown intro copy and use custom tag handler for links
	// note to readers: this Mardown-to-Hiccup conversion really should be moved
	// to a ViteJS build plugin at some point. Grateful for any pointers how to
	// do such a thing! 🙏
	const intro = parse(INTRO, {
		tags: {
			link: (_, href, title, body) =>
				anchor(".link.b.black", { href }, ...body),
		},
	}).result;

	// return complete component, incl. various reactive elements
	return div(
		{},
		para(".measure", {}, ...intro),
		// reactive threshold slider component
		div(
			".mv3",
			{},
			div(
				{},
				label({ for: "threshold" }, "Threshold: ", threshold),
				" / Selected images: ",
				related.map((x) => x.length)
			),
			inputRange({
				id: "threshold",
				min: 0,
				max: 1,
				step: 0.01,
				value: threshold,
				oninput: $inputNum(threshold),
				disabled: selected.map((x) => x < 0),
			})
		),
		div(
			".mv3",
			{},
			button(".mr2", { onclick: () => selected.next(-1) }, "show all"),
			"or click an image to only show related"
		),
		div(
			".relative",
			{},
			// reactive generalized list component, subscribes to `layoutItems`
			// and applies `imageItem` component function to item in the list
			$list(layoutItems, "div", {}, imageItem),
			// footer with reactive vertical position
			div(
				".absolute.mv2.h2",
				{ style: height.map((x) => ({ top: px(x) })) },
				"Image credits: © 2021 - 2023 Karsten Schmidt"
			)
		)
	);
};

// syntax sugar for CSS units
const px = (x: number) => x + "px";
