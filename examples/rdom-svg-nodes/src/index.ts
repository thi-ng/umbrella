import { defAtom } from "@thi.ng/atom";
import { equivArrayLike } from "@thi.ng/equiv";
import { circle, line, svg, text } from "@thi.ng/hiccup-svg";
import { $compile, $list, $replace } from "@thi.ng/rdom";
import { fromAtom } from "@thi.ng/rstream";
import { indexed, partition, repeatedly } from "@thi.ng/transducers";
import { random2 } from "@thi.ng/vectors";

const WIDTH = 600;
const NUM = 10;
const R = 20;

// define atom of NUM random points
const db = defAtom([...repeatedly(() => random2([], R, WIDTH - R), NUM)]);

// reactive subscription for atom changes
const $db = fromAtom(db);

// ID of currently dragged point
let clicked = -1;

$compile(
	svg(
		{
			width: WIDTH,
			height: WIDTH,
			viewBox: `0 0 ${WIDTH} ${WIDTH}`,
			// mouse drag & release handlers are on SVG element itself
			// for better UX when fast dragging
			onmousemove: (e: MouseEvent) =>
				clicked !== -1 && db.resetIn([clicked], [e.clientX, e.clientY]),
			onmouseup: () => (clicked = -1),
			// add new point on double click
			ondblclick: (e: MouseEvent) =>
				db.swap((pts) => [...pts, [e.clientX, e.clientY]]),
		},
		// reactive "list" of lines
		$list(
			// transform atom view into consecutive pairs:
			// e.g. [a,b,c,d] => [[a,b],[b,c],[c,d]]
			$db.map((pts) => [...partition(2, 1, pts)]),
			// list wrapper element & its attribs
			"g",
			{ stroke: "#00f" },
			// list item constructor (here an SVG line)
			([a, b]) => line(a, b),
			// value based equivalence predicate
			// applied to raw values from stream (here point pairs)
			// item ctors are only called if predicate returns false
			equivArrayLike
		),
		// reactive list of circles
		$list(
			// transform atom view to label each point with its array index
			// (needed to determine point selection in mouse event handler)
			$db.map((pts) => [...indexed(0, pts)]),
			// list wrapper element & its attribs
			"g",
			{ fill: "#00f" },
			// list items here are SVG circles
			// update selection & point position in atom on mouse click
			([i, p]) =>
				circle(p, R, {
					onmousedown: (e: MouseEvent) => {
						clicked = i;
						db.resetIn([i], [e.clientX, e.clientY]);
					},
				}),
			// value based equivalence predicate
			equivArrayLike
		),
		$replace(
			$db.map((x) =>
				text([10, 20], x.length + " nodes", { fill: "#000" })
			)
		)
	)
).mount(document.getElementById("app")!);
