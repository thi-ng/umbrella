import { sin } from "@thi.ng/dsp";
import { circle } from "@thi.ng/geom";
import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";
import {
    button,
    DEFAULT_THEME,
    IMGUI,
    slider,
    sliderGroup,
    textField,
    textLabel
} from "@thi.ng/imgui";
import { PI } from "@thi.ng/math";
import { float } from "@thi.ng/strings";
import { map, range2d } from "@thi.ng/transducers";
import { mulN } from "@thi.ng/vectors";

const app = () => {
    const gui = new IMGUI({
        width: 640,
        height: 480,
        theme: {
            ...DEFAULT_THEME,
            font: "10px 'IBM Plex Mono'",
            cursor: "#ff6"
        }
    });
    let isUiVisibe = false;
    let rad = [10];
    let numCircles = [16];
    let rgb = [0.5, 0.5, 0.5];
    let txt: any = ["Hello there! This is a test, do not panic!"];
    return () => {
        gui.begin();
        // prettier-ignore
        if (button(gui,"show", 0, 0, 100, 20, isUiVisibe ? "Hide UI" : "Show UI")) {
            isUiVisibe = !isUiVisibe;
        }
        // prettier-ignore
        if (isUiVisibe) {
            slider(gui, "numc", 0, 22, 100, 20, 1, 20, 1, numCircles, 0, "Circles");
            slider(gui, "rad", 0, 44, 100, 20, 2, 20, 1, rad, 0, "Radius", undefined, "Circle radius");
            sliderGroup(gui, "col", 102, 22, 100, 20, 0, 22, 0, 1, 0.05, rgb, ["R","G","B"], float(2), ["Red", "Green", "Blue"]);
            if (textField(gui, "txt", 0, 88, 202, 20, txt)) {
                console.log(txt[0]);
            }
        }
        const { key, hotID, activeID, focusID, lastID } = gui;
        // prettier-ignore
        gui.add(
            textLabel([10, 440], "#fff", `Keys: ${key} / ${[...gui.keys]}`),
            textLabel([10, 456], "#fff", `Focus: ${focusID} / ${lastID}`),
            textLabel([10, 470], "#fff", `IDs: ${hotID || "none"} / ${activeID || "none"}`)
        );
        gui.end();
        const n = numCircles[0] >> 1;
        return [
            canvas,
            { ...gui.attribs },
            [
                "g",
                {
                    fill: rgb,
                    translate: [320, 240],
                    rotate: PI / 4,
                    scale: rad[0]
                },
                ...map(
                    (p) => circle(mulN(p, p, sin(gui.time, 0.25, 0.5, 2.5)), 1),
                    range2d(-n, n + 1, -n, n + 1)
                )
            ],
            gui
        ];
    };
};

const cancel = start(app());

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
