import { canvas } from "@thi.ng/hdom-canvas";
import { fit, fitClamped } from "@thi.ng/math/fit";
import { gestureStream } from "@thi.ng/rstream-gestures";
import { fromAtom } from "@thi.ng/rstream/from/atom";
import { fromDOMEvent } from "@thi.ng/rstream/from/event";
import { merge } from "@thi.ng/rstream/stream-merge";
import { sync } from "@thi.ng/rstream/stream-sync";
import { sidechainPartitionRAF } from "@thi.ng/rstream/subs/sidechain-partition";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { map } from "@thi.ng/transducers/xform/map";
import { mapIndexed } from "@thi.ng/transducers/xform/map-indexed";
import { WINDOW_LEN } from "./config";
import { gui, updateGUI } from "./gui";
import { DB } from "./state";

const main = sync({
    src: {
        state: fromAtom(DB),
    },
});

const app = () => {
    const _canvas = {
        ...canvas,
        init(canv: HTMLCanvasElement) {
            main.add(
                merge<any, any>({
                    src: [
                        gestureStream(canv, {}).subscribe({
                            next(e) {
                                gui.setMouse(e.pos, e.buttons);
                            },
                        }),
                        fromDOMEvent(window, "resize").subscribe({
                            next() {
                                DB.resetIn(
                                    ["size"],
                                    [window.innerWidth, window.innerHeight]
                                );
                            },
                        }),
                    ],
                })
            );
        },
    };

    return () => {
        const width = window.innerWidth;
        const height = 500;
        const iwidth = width - 10;

        updateGUI(false);
        updateGUI(true);

        return [
            _canvas,
            {
                width,
                height,
                style: { background: gui.theme.globalBg, cursor: gui.cursor },
                ...gui.attribs,
            },
            gui,
            // waveform display
            [
                "polyline",
                { stroke: "red" },
                [
                    ...mapIndexed(
                        (i, y) => [
                            fit(i, 0, WINDOW_LEN - 1, 10, iwidth),
                            fitClamped(y, -1, 1, 490, 290),
                        ],
                        DB.value.wave
                    ),
                ],
            ],
        ];
    };
};

// subscription & transformation of app state stream. uses a RAF
// sidechain to buffer intra-frame state updates. then only passes the
// most recent one to `app()` and its resulting UI tree to the
// `updateDOM()` transducer
sidechainPartitionRAF(main).transform(map(app()), updateDOM());
