import type { Fn0 } from "@thi.ng/api";
import { sin } from "@thi.ng/dsp/osc-sin";
import { group } from "@thi.ng/geom/group";
import { polyline } from "@thi.ng/geom/polyline";
import { canvas } from "@thi.ng/hdom-canvas";
import { start } from "@thi.ng/hdom/start";
import { mulV23 } from "@thi.ng/matrices/mulv";
import { imagePromise } from "@thi.ng/pixel/canvas";
import { GRAY8 } from "@thi.ng/pixel/format/gray8";
import { intBufferFromImage } from "@thi.ng/pixel/int";
import { Node2D } from "@thi.ng/scenegraph/node2";
import { map } from "@thi.ng/transducers/map";
import { range } from "@thi.ng/transducers/range";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { setN2 } from "@thi.ng/vectors/setn";
import LOGO from "./logo-256.png";

/**
 * Specialized scene graph node for images.
 */
class ImgNode extends Node2D {
    img: HTMLImageElement;

    constructor(
        id: string,
        parent: Node2D,
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
            [0, 0],
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

imagePromise(LOGO).then((img) => {
    // mouse pos
    let mouse: Vec = [0, 0];

    // scene graph definition
    // set root node scale to window.devicePixelRatio
    const root = new Node2D("root", null);

    const main = new Node2D("main", root, [300, 300], 0, 1);
    const imgRoot = new Node2D("imgroot", main, [0, 0], 0, 2);
    const geom = new Node2D("waves", main, [0, 0], 0, 1, <any>null);

    const imgMap = intBufferFromImage(img, GRAY8, 256, 256);
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
            mulV23(imgRoot.translate, geom.invMat, mouse);
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
                    }, range(-200, 200)),
                ]),
            range(-200, 200, 5)
        );

        geom.body = group({ fill: "none", stroke: "#fff", weight: 0.5 }, [
            ...waves,
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
                ["b", "@thi.ng/hdom-canvas"],
            ],
            ["p", "Click to toggle image overlay"],
            [
                // hdom-canvas component
                // translates all shapes/attribs into canvas2d draw calls
                canvas,
                {
                    width: 600,
                    height: 600,
                    onmousemove: updateMouse,
                    onclick: toggleImage,
                },
                // only need to pass root node which then expands itself via
                // .toHiccup() during rendering
                root,
            ],
        ];
    };

    start(app);
});
