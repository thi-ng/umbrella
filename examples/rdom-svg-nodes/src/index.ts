import { defAtom } from "@thi.ng/atom";
import { equivArrayLike } from "@thi.ng/equiv";
import { $compile, $list } from "@thi.ng/rdom";
import { fromAtom } from "@thi.ng/rstream";
import { indexed, partition, repeatedly } from "@thi.ng/transducers";
import { random2 } from "@thi.ng/vectors";

const WIDTH = 600;
const NUM = 10;
const R = 20;

// define atom of NUM random points
const db = defAtom([...repeatedly(() => random2([], R, WIDTH - R), NUM)]);

// ID of currently dragged point
let clicked = -1;

$compile([
    "svg",
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
    // reactive list of lines
    $list(
        // transform atom view into consecutive pairs:
        // e.g. [a,b,c,d] => [[a,b],[b,c],[c,d]]
        fromAtom(db).map((pts) => [...partition(2, 1, pts)]),
        "g",
        { stroke: "#00f" },
        ([a, b]) => ["line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1] }],
        // value based equivalence predicate
        equivArrayLike
    ),
    // reactive list of circles
    $list(
        // transform atom view to label each point with its array index
        // (needed to determine point selection in mouse event handler)
        fromAtom(db).map((pts) => [...indexed(0, pts)]),
        "g",
        { fill: "#00f" },
        // define SVG circle with reactive center point
        // update point position in atom on mouse click
        ([i, p]) => [
            "circle",
            {
                cx: p[0],
                cy: p[1],
                r: R,
                onmousedown: (e: MouseEvent) => {
                    clicked = i;
                    db.resetIn([i], [e.clientX, e.clientY]);
                },
            },
        ],
        // value based equivalence predicate
        equivArrayLike
    ),
]).mount(document.getElementById("app")!);
