import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";
import { fitClamped, fract } from "@thi.ng/math";
import { HermiteRamp, IRamp, LinearRamp } from "@thi.ng/ramp";
import { repeatedly } from "@thi.ng/transducers";
import { ReadonlyVec, setC2, Vec } from "@thi.ng/vectors";
import {
    BASE_FREQ,
    CHEIGHT,
    CWIDTH,
    HEIGHT,
    PAD,
    PRESETS,
    SNAP,
    WIDTH,
} from "./api";
import { initAudio, isAudioActive, stopAudio, updateAudio } from "./audio";
import { rampViz } from "./components";

const timeForPos = (x: number) => fitClamped(x, PAD, WIDTH - PAD, 0, 1);

const valueForPos = (y: number) => fitClamped(y, PAD, HEIGHT - PAD, 1, 0);

const editRamp = (mpos: ReadonlyVec, currID: number) => {
    const y = valueForPos(mpos[1]);
    let t = timeForPos(mpos[0]);
    let i = currID !== -1 ? currID : ramp.closestIndex(t, SNAP);
    if (i !== -1) {
        t = ramp.clampedIndexTime(i, t, SNAP);
        ramp.stops[i] =
            mpos[1] <= HEIGHT - PAD ? [t, y] : [t, ramp.stops[i][1]];
    } else if (currID === -1) {
        ramp.stops.push([t, y]);
        ramp.sort();
        i = ramp.closestIndex(t, SNAP);
    }
    updateAudio(ramp);
    return i;
};

const updateMarker = (id: number, mpos: ReadonlyVec) => {
    ramp.stops[id][0] = ramp.clampedIndexTime(id, timeForPos(mpos[0]), SNAP);
    ramp.sort();
    updateAudio(ramp);
};

const toggleRampMode = () => {
    ramp =
        ramp instanceof LinearRamp
            ? new HermiteRamp(ramp.stops)
            : new LinearRamp(ramp.stops);
    updateAudio(ramp);
};

let ramp: IRamp = new HermiteRamp(PRESETS[0].map((p) => (<any>p).slice()));

const mpos: Vec = [-1, -1];

let isDown = false;
let selID = -1;
let currID = -1;
let currT = 0;
let autoToggle = false;

const gradient = [
    "defs",
    {},
    [
        "linearGradient",
        {
            id: "ramp",
            from: [0, 0],
            to: [0, 1],
        },
        [
            [0, "#99b"],
            [1, "#111"],
        ],
    ],
];

start(() => {
    currT = fract(currT + 0.01);
    if (autoToggle && fract(currT * 2) < 0.01) {
        toggleRampMode();
    }
    return [
        canvas,
        {
            width: WIDTH,
            height: HEIGHT,
            onmousedown: () => {
                isDown = true;
                selID =
                    mpos[1] >= HEIGHT - PAD
                        ? ramp.closestIndex(timeForPos(mpos[0]), SNAP)
                        : -1;
                currID = -1;
            },
            onmouseup: () => {
                isDown = false;
                selID = -1;
                currID = -1;
            },
            onmousemove: (e: MouseEvent) => {
                const b = (<any>e.target).getBoundingClientRect();
                setC2(mpos, e.clientX - b.left, e.clientY - b.top);
                if (isDown) {
                    if (selID !== -1) {
                        updateMarker(selID, mpos);
                    } else {
                        currID = editRamp(mpos, currID);
                    }
                }
            },
        },
        gradient,
        [
            "g",
            {
                translate: [PAD, PAD],
                __diff: false,
            },
            rampViz(ramp, CWIDTH, CHEIGHT),
            [
                "g",
                { translate: [currT * CWIDTH, 0] },
                ["line", { stroke: "red" }, [0, 0], [0, CHEIGHT]],
                [
                    "circle",
                    { fill: "red" },
                    [0, (1 - ramp.at(currT)) * CHEIGHT],
                    3,
                ],
            ],
        ],
        selID !== -1 ||
        currID !== -1 ||
        ramp.closestIndex(timeForPos(mpos[0]), SNAP) !== -1
            ? [
                  "g",
                  { stroke: "#777", dash: [1, 2] },
                  ["line", {}, [mpos[0], PAD], [mpos[0], PAD + CHEIGHT]],
                  mpos[1] < HEIGHT - PAD
                      ? ["line", {}, [PAD, mpos[1]], [PAD + CWIDTH, mpos[1]]]
                      : null,
              ]
            : null,
    ];
});

window.addEventListener("keydown", (e) => {
    const t = timeForPos(mpos[0]);
    switch (e.key) {
        case "l":
            toggleRampMode();
            break;
        case "t":
            autoToggle = !autoToggle;
            break;
        case "u":
            ramp.uniform();
            updateAudio(ramp);
            break;
        case "x":
            if (ramp.removeStopAt(t, SNAP)) {
                updateAudio(ramp);
            }
            break;
        case "s":
            PRESETS[4] = ramp.stops.slice();
            break;
        case "r":
            ramp.stops = [
                ...repeatedly(
                    () => [Math.random(), Math.random()],
                    Math.random() * 37 + 3
                ),
            ];
            ramp.sort();
            updateAudio(ramp);
            break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
            ramp.stops = PRESETS[e.keyCode - 49].map((p) => (<any>p).slice());
            updateAudio(ramp);
            break;
        case "a":
            if (!isAudioActive()) {
                initAudio(BASE_FREQ);
                updateAudio(ramp);
            } else {
                stopAudio();
            }
            break;
    }
});
