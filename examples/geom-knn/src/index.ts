import { timedResult } from "@thi.ng/bench";
import { KdTreeMap } from "@thi.ng/geom-accel";
import { canvas } from "@thi.ng/hdom-canvas";
import { CloseMode, StreamSync, sync, trigger } from "@thi.ng/rstream";
import { gestureStream } from "@thi.ng/rstream-gestures";
import { map, mapcat } from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";
import type { Vec } from "@thi.ng/vectors";

const app = (main: StreamSync<any, any>) => {
    // augment hdom-canvas component w/ `init` lifecycle method: this is
    // method is called when the canvas DOM element is first created and
    // used to attach a mouse & touch event stream to it. this stream is
    // then transformed using a transducer to only select the mouse
    // position and then added as new input to the `main` stream
    // combinator below...
    const _canvas = {
        ...canvas,
        init: (el: HTMLCanvasElement) =>
            main.add(gestureStream(el).transform(map((g) => g.pos)), "mpos"),
    };
    // initialize 1st point & store in tree for fast KNN searches
    const width = window.innerWidth;
    const height = window.innerHeight;
    let tree = new KdTreeMap<Vec, number>(2);

    // return root component function, triggered by each new mouse / touch event
    return ({ mpos }: { mpos: Vec }) => {
        // recreate tree every 500 points (in lieu of re-balancing)
        if (!(tree.size % 500)) {
            tree = tree.copy();
        }
        // the 1st invocation of this function will be via the
        // `trigger()` stream defined further below. that means
        // initially, there will be no valid `mpos` and so we insert a
        // default point instead
        mpos = mpos || [width / 2, height / 2];
        // record new pos in tree
        tree.set(mpos, 1.5 + Math.random() * 5);
        // even though we only create 2d vectors, we store a 3rd value
        // in the backing array, which will be later used as radius when
        // the point has been selected as part of a KNN query and is
        // visualized as circle.
        // mpos.push(1.5 + Math.random() * 5);

        // select max. 200 neighbors for given mouse position,
        // measure execution time...
        let [selected, t1] = timedResult(() =>
            tree.query(mpos, width / 4, 200)
        );
        // for each selected neighbor, perform another KNN search and
        // create line segments to each of these secondary matches
        // use `mapcat` to yield a flat array of lines
        let [neighbors, t2] = timedResult(() => [
            ...mapcat(
                (p) =>
                    tree
                        .queryKeys(p[0], width / 4, 8)
                        .map((q) => ["line", {}, p[0], q]),
                selected
            ),
        ]);
        return [
            "div.overflow-hidden.sans-serif.f7",
            // tree stats
            [
                "div",
                `Points: ${tree.size}, Sel: ${selected.length}, `,
                `Neighbors: ${neighbors.length}, Q1: ${t1}ms, Q2: ${t2}ms, `,
                `Height: ${tree.height}, Ratio: ${tree.ratio.toFixed(2)}`,
            ],
            // visualize
            // the __diff & __normalize control attribs are used to optimize drawing perf
            // see: https://github.com/thi-ng/umbrella/tree/develop/packages/hdom#behavior-control-attributes
            [
                _canvas,
                { width, height, __diff: false, __normalize: false },
                // point cloud
                ["points", { fill: "black", size: 2 }, tree.keys()],
                // selected points as circles (using 3rd array item as radius)
                [
                    "g",
                    { fill: "rgba(0,192,255,0.5)" },
                    ...selected.map((p) => ["circle", {}, p[0], p[1]]),
                ],
                // secondary neighbor connections
                ["g", { stroke: "rgba(0,0,0,0.25)" }, ...neighbors],
            ],
        ];
    };
};

// main stream combinator: initially only a single dummy `trigger` input
// is assigned to kick off rendering... in the 1st frame the canvas
// component's `init` method is called which attaches the above gesture
// stream dynamically. the entire UI then only updates when there are new
// user interactions...
const main = sync<any, any>({
    src: { trigger: trigger() },
    closeIn: CloseMode.NEVER,
});
// transform result stream using the
// root component fn and the hdom differential
// update transducer
main.transform(map(app(main)), updateDOM());
