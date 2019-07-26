import { Fn0, IToHiccup } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import { sin } from "@thi.ng/dsp";
import { group, polyline } from "@thi.ng/geom";
import { IShape } from "@thi.ng/geom-api";
import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";
import {
    invert23,
    Mat,
    mulM23,
    mulV23,
    transform23
} from "@thi.ng/matrices";
import { GRAY8, imagePromise, PackedBuffer } from "@thi.ng/pixel";
import { map, range } from "@thi.ng/transducers";
import {
    mulN2,
    ReadonlyVec,
    setN2,
    Vec
} from "@thi.ng/vectors";
import LOGO from "../assets/logo-256.png";

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

    enabled: boolean;
    display: boolean;

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
        this.enabled = true;
        this.display = true;
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
        if (this.enabled) {
            this.mat = transform23([], this.translate, this.rotate, this.scale);
            if (this.parent) {
                this.mat = mulM23(this.mat, this.parent.mat, this.mat);
            }
            invert23(this.invMat, this.mat);
            for (let c of this.children) {
                c.update();
            }
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
        const children = this.children;
        for (let i = children.length; --i >= 0; ) {
            const n = children[i].childForPoint(p);
            if (n) {
                return n;
            }
        }
        const q = this.mapGlobalPoint(p);
        if (this.containsLocalPoint(q)) {
            return { node: this, p: q };
        }
    }

    /**
     * Returns copy of world space point `p`, transformed into this
     * node's local coordinate system.
     *
     * @param p
     */
    mapGlobalPoint(p: ReadonlyVec) {
        return mulV23([], this.invMat, p);
    }

    /**
     * Returns copy of node local space point `p`, transformed into the
     * coordinate system of `dest` node.
     *
     * @param dest
     * @param p
     */
    mapLocalPointToNode(dest: Node, p: ReadonlyVec) {
        return mulV23(null, dest.invMat, mulV23([], this.mat, p));
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
        if (this.display && this.enabled) {
            return [
                "g",
                { setTransform: this.mat },
                this.body,
                ...this.children
            ];
        }
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
        return true; //pointInside(this.body, p);
    }
}

class ImgNode extends Node {
    img: HTMLImageElement;

    constructor(
        id: string,
        parent: Node,
        t: Vec,
        r: number,
        s: Vec | number,
        img: HTMLImageElement,
        size: Vec,
        alpha = 1
    ) {
        super(id, parent, t, r, s, [
            "img",
            { alpha, width: size[0], height: size[1] },
            img,
            [0, 0]
        ]);
        this.img = img;
    }

    containsLocalPoint(p: ReadonlyVec) {
        return (
            !!this.img &&
            p[0] >= 0 &&
            p[0] < this.img.width &&
            p[1] >= 0 &&
            p[1] < this.img.height
        );
    }
}

let cancel: Fn0<void>;

imagePromise(LOGO).then((img) => {
    // mouse pos
    let mouse: Vec = [0, 0];

    // scene graph definition
    // set root node scale to window.devicePixelRatio
    const root = new Node("root", null, [0, 0], 0, DPR);

    const main = new Node("main", root, [300, 300], 0, 1);
    const imgRoot = new Node("imgroot", main, [0, 0], 0, 2);
    const geom = new GeomNode("waves", main, [0, 0], 0, 1, <any>null);

    const imgMap = PackedBuffer.fromImage(img, GRAY8, 256, 256);
    const imgNode = new ImgNode(
        "img",
        imgRoot,
        [-imgMap.width / 2, -imgMap.height / 2],
        0,
        1,
        img,
        [imgMap.width, imgMap.height],
        0.5
    );
    imgNode.display = false;

    // mousemove event handler
    const updateMouse = (e: MouseEvent) => {
        mouse = [e.offsetX, e.offsetY];
        if (imgRoot) {
            mulV23(imgRoot.translate, geom.invMat, mulN2([], mouse, DPR));
        }
    };

    // onclick handler to toggle image display
    const toggleImage = () => (imgNode.display = !imgNode.display);

    // main hdom root component / app
    const app = () => {
        imgRoot.rotate += 0.04;
        imgRoot.scale = setN2([], sin(imgRoot.rotate, 0.5, 2, 3.5));
        imgRoot.update();

        const waves = map(
            (y) =>
                polyline([
                    ...map((x) => {
                        const q = geom.mapLocalPointToNode(imgNode, [x, y]);
                        const r = (imgMap.getAt(q[0], q[1]) * 5) / 255;
                        return [x, sin(x, 0.05, r, y)];
                    }, range(-200, 200))
                ]),
            range(-200, 200, 5)
        );

        geom.body = group({ fill: "none", stroke: "#fff", weight: 0.5 }, [
            ...waves
        ]);
        return [
            "div.sans-serif.pl3",
            ["h1", "scenegraph node-to-node UV mapping"],
            [
                "p",
                "using ",
                ["b", "@thi.ng/geom"],
                ", ",
                ["b", "@thi.ng/pixel"],
                " and ",
                ["b", "@thi.ng/hdom-canvas"]
            ],
            [
                // hdom-canvas component
                // translates all shapes/attribs into canvas2d draw calls
                canvas,
                {
                    width: 600,
                    height: 600,
                    onmousemove: updateMouse,
                    onclick: toggleImage
                },
                // only need to pass root node which then expands itself via
                // .toHiccup() during rendering
                root
            ]
        ];
    };

    cancel = start(app);
});

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && cancel! && hot.dispose(cancel!);
}
