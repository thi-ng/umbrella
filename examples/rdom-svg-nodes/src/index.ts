import { defAtom } from "@thi.ng/atom/atom";
import { equivArrayLike } from "@thi.ng/equiv";
import { circle } from "@thi.ng/hiccup-svg/circle";
import { line } from "@thi.ng/hiccup-svg/line";
import { svg } from "@thi.ng/hiccup-svg/svg";
import { $compile } from "@thi.ng/rdom/compile";
import { $list } from "@thi.ng/rdom/list";
import { fromAtom } from "@thi.ng/rstream/from/atom";
import { repeatedly } from "@thi.ng/transducers/iter/repeatedly";
import { indexed } from "@thi.ng/transducers/xform/indexed";
import { partition } from "@thi.ng/transducers/xform/partition";
import { random2 } from "@thi.ng/vectors/random";

const WIDTH = 600;
const NUM = 10;
const R = 20;

// define atom of NUM random points
const db = defAtom([...repeatedly(() => random2([], R, WIDTH - R), NUM)]);

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
            fromAtom(db).map((pts) => [...partition(2, 1, pts)]),
            // list wrapper element & its attribs
            "g",
            { stroke: "#00f" },
            // list item contructor (here an SVG line)
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
            fromAtom(db).map((pts) => [...indexed(0, pts)]),
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
        )
    )
).mount(document.getElementById("app")!);
