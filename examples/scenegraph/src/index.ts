import { IToHiccup } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import {
    asPolygon,
    circle,
    pointInside,
    rect
} from "@thi.ng/geom";
import { IShape } from "@thi.ng/geom-api";
import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";
import { HALF_PI, PI } from "@thi.ng/math";
import {
    invert23,
    Mat,
    mulM23,
    mulV23,
    transform23
} from "@thi.ng/matrices";
import { cycle, map, range } from "@thi.ng/transducers";
import {
    cartesian2,
    mulN2,
    ReadonlyVec,
    Vec
} from "@thi.ng/vectors";

const DPR = window.devicePixelRatio;

/**
 * Node information for mouse picking.
 */
interface NodeInfo {
    /**
     * selected node
     */
    node: Node;
    /**
     * mouse pos in node local coordinate space
     */
    p: Vec;
}

/**
 * Basic scene graph node.
 */
class Node implements IToHiccup {
    id: string;
    parent: Node | null;
    children: Node[];

    translate: Vec;
    rotate: number;
    scale: Vec;

    body: any;

    mat!: Mat;
    invMat!: Mat;

    constructor(
        id: string,
        parent: Node | null,
        translate: Vec,
        rotate: number,
        scale: Vec | number,
        body?: any
    ) {
        this.id = id;
        this.parent = parent;
        this.children = [];
        this.translate = translate;
        this.rotate = rotate;
        this.scale = isNumber(scale) ? [scale, scale] : scale;
        this.body = body;
        if (parent) {
            parent.children.push(this);
        }
        this.invMat = [];
        this.update();
    }

    /**
     * Updates matrices of this node and of all children. If node has a
     * parent, the matrix will be concatenated to the parent's matrix.
     *
     * The matrix functions used here are hardcoded for 2D use cases
     * (2x3 matrices), but similar functions can be used for 3D
     * scenegraphs.
     */
    update() {
        this.mat = transform23([], this.translate, this.rotate, this.scale);
        if (this.parent) {
            this.mat = mulM23(this.mat, this.parent.mat, this.mat);
        }
        invert23(this.invMat, this.mat);
        for (let c of this.children) {
            c.update();
        }
    }

    /**
     * Checks all children, then (if no child matched) node itself for
     * containment of given point (in screen coords). Returns `NodeInfo`
     * object with matched node (if any) or undefined.
     *
     * @param p
     */
    childForPoint(p: ReadonlyVec): NodeInfo | undefined {
        for (let c of this.children) {
            const n = c.childForPoint(p);
            if (n) {
                return n;
            }
        }
        const q = mulV23([], this.invMat, p);
        if (this.containsLocalPoint(q)) {
            return { node: this, p: q };
        }
    }

    /**
     * Returns true, if given point is contained within the boundary of
     * this node. Since this class is used as a base implementation for
     * other, more specialized scene graph nodes, this base impl always
     * returns false (meaning these nodes cannot be selected by the user).
     *
     * @param p
     */
    containsLocalPoint(_: ReadonlyVec) {
        return false;
    }

    /**
     * By implementing this method (`IToHiccup` interface), scene graph
     * nodes can be directly used by hdom-canvas.
     */
    toHiccup() {
        return ["g", { setTransform: this.mat }, this.body, ...this.children];
    }
}

/**
 * Specialized scene graph node using @thi.ng/geom shapes as body.
 */
class GeomNode extends Node {
    constructor(
        id: string,
        parent: Node,
        t: Vec,
        r: number,
        s: Vec | number,
        body: IShape
    ) {
        super(id, parent, t, r, s, body);
    }

    /**
     * Override method to check for actual point containment with body
     * shape.
     *
     * @param p
     */
    containsLocalPoint(p: ReadonlyVec) {
        return pointInside(this.body, p);
    }
}

// mouse pos
let mouse: Vec = [0, 0];
// info object for mouse over
let info: NodeInfo | undefined;

// color iterator (used for node highlighting)
const colors = cycle([
    "#f00",
    "#ff0",
    "#06f",
    "#70f",
    "#666",
    "#9f0",
    "#0ff",
    "#090",
    "#f60"
]);

// scene graph definition

// set root node scale to window.devicePixelRatio
const root = new Node("root", null, [0, 0], 0, DPR);

// main geometry node w/ origin at canvas center
const hex = new GeomNode(
    "main",
    root,
    [300, 300],
    0,
    200,
    asPolygon(circle(0.5, { fill: "#0ff" }), 6)
);

// rotated child node
const triangle = new GeomNode(
    "tri",
    hex,
    [0, 0],
    PI / 4,
    1,
    asPolygon(circle(0.5, { fill: "#f0f" }), 3)
);

// secondary children
const satellites = [
    ...map(
        (i) =>
            new GeomNode(
                `sat-${i}`,
                triangle,
                cartesian2([], [1, i * HALF_PI]),
                0,
                0.2,
                rect([-0.5, -0.5], [1, 1], { fill: "#cf0" })
            ),
        range(4)
    )
];

// this node uses a hdom component function as body to create the dynamic
// crosshair and node info overlay
const infoNode = new Node("info", root, mouse, 0, 1, () => [
    "g",
    {},
    // crosshair
    ["g", { stroke: "#999", dash: [2, 2] }, ["hline", {}, 0], ["vline", {}, 0]],
    // only show text overlay if info present
    info
        ? [
              "g",
              { fill: "#fff" },
              rect([0, -40], [68, 40], { fill: "rgba(0,0,0,0.8)" }),
              [
                  "text",
                  {},
                  [8, -10],
                  `${info.p[0].toFixed(2)}, ${info.p[1].toFixed(2)}`
              ],
              ["text", {}, [8, -24], `ID: ${info.node.id}`]
          ]
        : undefined
]);

// mousemove event handler
const updateMouse = (e: MouseEvent) => {
    mouse = [e.offsetX, e.offsetY];
    info = root.childForPoint(mulN2([], mouse, DPR));
    infoNode.translate = mouse;
};

// onclick handler, assigns new fill color to selected node (if any)
const selectNode = () =>
    info && (info.node.body.attribs.fill = colors.next().value);

// main hdom root component / app
const app = () => {
    // update scene graph nodes
    hex.rotate += 0.005;
    mulN2(triangle.scale, [1, 1], Math.sin(hex.rotate * 5) * 0.3 + 0.7);
    satellites.forEach((s) => (s.rotate += 0.02));
    // recompute matrices
    root.update();

    return [
        "div.sans-serif.pl3",
        ["h1", "hdom canvas scene graph demo"],
        ["p", "click on shapes to change their color..."],
        // hdom-canvas component
        // translates all shapes/attribs into canvas2d draw calls
        [
            canvas,
            {
                width: 600,
                height: 600,
                onmousemove: updateMouse,
                onclick: selectNode
            },
            // only need to pass root node which then expands itself via
            // .toHiccup() during rendering
            root
        ]
    ];
};

const cancel = start(app);

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
