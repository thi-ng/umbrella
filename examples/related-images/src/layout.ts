import { argMin, selectThresholdMin } from "@thi.ng/arrays";
import type { LayoutItem, RankedItem } from "./api.js";

interface LayoutOpts {
	cols: number;
	width: number;
	gap?: number;
	margin?: number;
	extraHeight?: number;
	snap?: number;
}

// based on and expanded version of the eponymous function in the "stacked-layout"
// example: https://github.com/thi-ng/umbrella/blob/develop/examples/stacked-layout
//
// this new version adds several improvements & options to better align the
// vertical column offsets and returns an object with the main layout function
// and a function to query the final (or current) max height...
export const columnLayout = (opts: LayoutOpts) => {
	const {
		cols,
		width: totalWidth,
		gap,
		margin,
		extraHeight,
		snap,
	} = {
		gap: 8,
		margin: 0,
		extraHeight: 0,
		snap: 1,
		...opts,
	};
	// vector of vertical column offsets
	const offsets = new Int32Array(cols);
	// column width
	const width = (totalWidth - 2 * margin - (cols - 1) * gap) / cols;
	// return transformation function for single items
	return {
		height: () => Math.max(...offsets),
		fn: (item: RankedItem) => {
			// find colum index with smallest offset
			const column = argMin(offsets);
			const y = offsets[column];
			const h = (width / item[0].aspect! + extraHeight) | 0;
			// update column offset
			offsets[column] = Math.ceil((y + h + gap) / snap) * snap;
			// build result object w/ position & size
			const result: LayoutItem = {
				x: (margin + column * (width + gap)) | 0,
				y,
				w: width | 0,
				h: offsets[column] - y - gap,
				item,
			};
			return result;
		},
	};
};

// build a function which selects the correct number of columns for a given
// window width. returns default value (here: 5) if none of the thresholds/breakpoints
// can be matched (i.e. for larger window sizes)
// see: https://docs.thi.ng/umbrella/arrays/functions/selectThresholdMin.html
export const columnsForWidth = selectThresholdMin(
	{ 640: 2, 1024: 3, 1280: 4, 1680: 5, 1920: 6, 2560: 8 },
	9
);
