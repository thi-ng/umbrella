import { isMobile } from "@thi.ng/checks/is-mobile";
import { div } from "@thi.ng/hiccup-html/blocks";
import { button, inputFile, label } from "@thi.ng/hiccup-html/forms";
import { span } from "@thi.ng/hiccup-html/inline";
import { h1 } from "@thi.ng/hiccup-html/sections";
import { staticRadio } from "@thi.ng/rdom-components/radio";
import { $compile } from "@thi.ng/rdom/compile";
import { $inputFile, $inputTrigger } from "@thi.ng/rdom/event";
import { $refresh } from "@thi.ng/rdom/switch";
import { reactive, stream } from "@thi.ng/rstream/stream";
import { sync } from "@thi.ng/rstream/sync";
import { float } from "@thi.ng/strings/float";
import { map } from "@thi.ng/transducers/map";
import type { SortMode } from "./api";
import { cssPalette } from "./components/css";
import { PixelCanvas } from "./components/pixelcanvas";
import { slider } from "./components/slider";
import { downloadACT } from "./palette";
import { postProcess, processImage } from "./process";

// stream of input files
const file = stream<File>();
// images read from files
const image = stream<HTMLImageElement>();
// number of dominant colors to extract
const num = reactive(8);
// min chromacity of result colors (percent)
const minChroma = reactive(10);
// min cluster area (percent)
const minArea = reactive(0.5);
const sortMode = reactive<SortMode>("hue");
// dummy stream to retrigger updates
const update = reactive(true);

const size = (isMobile() ? 0.5 : 1) * 25;

// stream combinator & image processor
const main = sync({
    src: {
        image,
        num,
        minChroma,
        _: update,
    },
    xform: map((params) =>
        processImage(params.image, params.num, params.minChroma * 0.01)
    ),
});

// final result combinator & post-analysis/filtering
const result = sync({
    src: { main, minArea, sortMode },
    xform: map(({ main: { buf, colors }, minArea, sortMode }) => ({
        buf,
        ...postProcess(colors, minArea, sortMode),
    })),
});

// new values pushed into `file` will trigger reading file as an image
// once ready, puts image into `image` stream for further processing
file.subscribe({
    next(file) {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            image.next(img);
            URL.revokeObjectURL(url); // house keeping!
        };
        img.src = url;
    },
});

// main UI
$compile(
    div(
        ".lh-copy.f6.f5-ns",
        {},
        h1(".ma0", {}, "Dominant colors"),
        inputFile(".db.mv3", {
            accept: ["image/jpg", "image/png", "image/gif", "image/webp"],
            multiple: false,
            onchange: $inputFile(file),
        }),
        slider(num, "max. colors", {
            min: 2,
            max: 16,
            step: 1,
        }),
        slider(minChroma, "min. chroma", {
            min: 0,
            max: 100,
            step: 5,
        }),
        slider(minArea, "min. area", {
            min: 0,
            max: 25,
            step: 0.5,
        }),
        div(".mv3", {}, "Sort colors by:"),
        staticRadio<SortMode>(["hue", "luma", "area"], <any>sortMode, {
            label: (id, radio) =>
                label(
                    ".db",
                    { for: id },
                    span(".dib.w-50.w-25-ns", {}, id),
                    radio
                ),
        }),
        button(".db.mv3", { onclick: $inputTrigger(update) }, "update"),
        div(
            {},
            // this part of the UI will be replaced for each new processed image
            $refresh(result, async (res) =>
                div(
                    {},
                    cssPalette(res.colors),
                    // resized image as canvas
                    new PixelCanvas(res.buf),
                    // swatches of dominant colors
                    div(
                        {},
                        `hue range: ${res.hues.map(float(3)).join(" .. ")}`
                    ),
                    // download palette button
                    button(
                        ".db.mv3",
                        {
                            onclick: () =>
                                downloadACT(res.colors.map((c) => c.col)),
                        },
                        "download .act palette"
                    )
                )
            )
        )
    )
).mount(document.getElementById("app")!);
