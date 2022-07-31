import type { Fn2 } from "@thi.ng/api";
import { comp } from "@thi.ng/transducers/comp";
import { drop } from "@thi.ng/transducers/drop";
import { iterator } from "@thi.ng/transducers/iterator";
import { take } from "@thi.ng/transducers/take";

interface VScrollOpts {
	/**
	 * Current index of 1st visible item
	 */
	start: number;
	/**
	 * Current scroll offset
	 */
	top: number;
	/**
	 *
	 */
	onscroll: Fn2<number, number, void>;
	/**
	 * Max number of items visible
	 * Container height will be computed as: `numVisible * itemHeight`
	 */
	numVisible: number;
	/**
	 * Total number of items.
	 */
	numItems: number;
	/**
	 * Height (in pixels) of single item.
	 */
	itemHeight: number;
	/**
	 * Item components.
	 */
	items: Iterable<any>;
}

export const virtualScroller = ({
	start,
	top,
	onscroll,
	numVisible,
	numItems,
	itemHeight,
	items,
}: VScrollOpts) => [
	"div.overflow-y-scroll",
	{
		onscroll: (e: Event) => {
			const top = (<HTMLElement>e.target).scrollTop;
			const offset = Math.min(
				Math.floor(top / itemHeight),
				numItems - numVisible
			);
			onscroll(top, offset);
		},
		scrollTop: top,
		style: {
			height: `${numVisible * itemHeight}px`,
		},
	},
	[
		"div",
		{
			style: {
				height: `${numItems * itemHeight}px`,
				"padding-top": `${
					Math.min(start, numItems - numVisible) * itemHeight
				}px`,
			},
		},
		iterator(comp(drop(start), take(numVisible + 1)), items),
	],
];
