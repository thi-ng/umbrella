import { br, div } from "@thi.ng/hiccup-html";
import {
	StackedLayout,
	stackedLayout,
	type CellSpan,
	type LayoutBox,
} from "@thi.ng/layout";
import { SYSTEM, pickRandom, pickRandomUnique } from "@thi.ng/random";
import { $compile, type ComponentLike } from "@thi.ng/rdom";
import {
	comp,
	flatten1,
	iterator,
	repeatedly,
	takeWhile,
} from "@thi.ng/transducers";

// PRNG instance to use (see thi.ng/random for alternatives)
const RND = SYSTEM;
// number of layout boxes in main layout
const NUM_CELLS = 50;
// max number of cols/rows + 1 a single cell can cover
const MAX_SPAN = 5;
// nested layout probability
const NEST_PROB = 0.2;
// color choices for each tree depth (in the nested layout)
const COLORS = [
	[
		"red",
		"dark-red",
		"gold",
		"yellow",
		"navy.white",
		"blue",
		"light-blue",
		"dark-pink",
		"hot-pink",
		"light-green",
	],
	["black-80.white", "black-60.white", "black-40.white"],
	["purple.white", "light-purple.white"],
	["dark-green.white", "green.white"],
];

// formatting helper
const px = (x: number) => x + "px";

let color: string = "";

const defCell = (box: LayoutBox, depth: number): ComponentLike => {
	const { x, y, w, h, span } = box;
	color = pickRandomUnique(1, COLORS[depth], [color], 10, RND).pop()!;
	return div(
		`.absolute.bg-${color}.pa2.f7`,
		{
			style: {
				left: px(x),
				top: px(y),
				width: px(w),
				height: px(h),
			},
		},
		span.join("x"),
		br(),
		`(d:${depth})`
	);
};

// helper predicate to check if all column offsets/heights in the layout are equal
const isEqualized = (layout: StackedLayout) =>
	Math.min(...layout.offsets) === Math.max(...layout.offsets);

// lazy & recursive grid cell generator: draws `num` random-sized cells from the
// given layout generator and potentially nests itself up to `maxDepth`.
// the resulting iterator yields individual <div> elements (in thi.ng/hiccup
// format), one per generated layout cell...
const cellIterator = (
	layout: StackedLayout,
	num: number,
	depth = 0,
	maxDepth = 3
): Iterable<ComponentLike> =>
	// create iterator which transforms input via transducers
	iterator(
		// compose a transducer which stops consuming input with first undefined
		// result removes one level of nesting (in terms of data, not layout!)
		// and results in a sequence of individual elements
		comp(
			takeWhile((x) => x !== undefined),
			flatten1()
		),
		// infinite sequence generator of layout cells
		repeatedly((i) => {
			let span: CellSpan;
			// if the target number still hasn't been reached...
			if (i < num) {
				// choose a random cell span for this box
				span = [RND.minmaxInt(1, MAX_SPAN), RND.minmaxInt(1, MAX_SPAN)];
				// also find largest available space
				const largest = layout.availableSpan();
				// choose whichever is better option
				if (largest[0] < span[0] && largest[1] > 0) span = largest;
			} else {
				// fill up remaining bottom gap(s) then stop
				if (isEqualized(layout)) return;
				// for each box limit available space to max configured (to avoid super-large cells)
				span = layout.availableSpan([MAX_SPAN, MAX_SPAN]);
			}
			// check if span qualifies for nesting
			if (span[0] > 1 && depth < maxDepth && RND.probability(NEST_PROB)) {
				// choose number of columns in child layout
				const numCols = RND.minmaxInt(2, 4);
				// return iterable of nested cells
				return cellIterator(
					layout.nest(numCols, [span[0], 1]),
					numCols,
					depth + 1,
					maxDepth
				);
			} else {
				// allocate cell span and transform raw layout info into a <div>
				return [defCell(layout.next(span), depth)];
			}
		})
	);

// create main layout with random params
const mainLayout = stackedLayout(
	0,
	0,
	window.innerWidth,
	// number of columns
	pickRandom([1, 2, 3, 4, 5, 6, 8, 10, 16, 20], RND),
	// row height
	60,
	// gap/gutter between cells
	pickRandom([0, 1, 2, 4, 8, 16], RND)
);

// generate DOM elements
const grid = div(".relative.w-100", {}, ...cellIterator(mainLayout, NUM_CELLS));

// compile & mount
$compile(grid).mount(document.getElementById("app")!);
