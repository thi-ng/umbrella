import { defAtom } from "@thi.ng/atom";
import { $compile } from "@thi.ng/rdom";
import { fromView } from "@thi.ng/rstream";
import { map, range, repeatedly } from "@thi.ng/transducers";
import { random2, Vec } from "@thi.ng/vectors";

const WIDTH = 600;
const NUM = 10;
const R = 20;

// define atom of NUM random points
const db = defAtom([...repeatedly(() => random2([], R, WIDTH - R), NUM)]);

// attach reactive stream for each point
const points = [...map((i) => fromView(db, { path: [i] }), range(NUM))];

// ID of currently dragged point
let clicked = -1;

// destructuring helpers
const $x = (p: Vec) => p[0];
const $y = (p: Vec) => p[1];

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
    },
    [
        "g",
        { stroke: "#00f" },
        ...map((i) => {
            const a = points[i];
            const b = points[i + 1];
            // define SVG line element with reactive end points
            // line will only update if end points change
            return [
                "line",
                {
                    x1: a.map($x),
                    y1: a.map($y),
                    x2: b.map($x),
                    y2: b.map($y),
                },
            ];
        }, range(NUM - 1)),
    ],
    [
        "g",
        { fill: "#00f" },
        // likewise, define SVG circle with reactive center point
        // update point position in atom on mouse click
        ...map(
            (i) => [
                "circle",
                {
                    cx: points[i].map($x),
                    cy: points[i].map($y),
                    r: R,
                    onmousedown: (e: MouseEvent) => {
                        clicked = i;
                        db.resetIn([i], [e.clientX, e.clientY]);
                    },
                },
            ],
            range(NUM)
        ),
    ],
]).mount(document.getElementById("app")!);
