import { isMobile } from "@thi.ng/checks";
import { button, div, h1, inputFile, label, span } from "@thi.ng/hiccup-html";
import { $compile, $inputFile, $inputTrigger, $refresh } from "@thi.ng/rdom";
import { staticRadio } from "@thi.ng/rdom-components";
import { reactive, stream, sync } from "@thi.ng/rstream";
import { float } from "@thi.ng/strings";
import { map } from "@thi.ng/transducers";
import type { SortMode } from "./api";
import { PixelCanvas } from "./components/pixelcanvas";
import { slider } from "./components/slider";
import { svgSwatches } from "./components/swatches";
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
const minArea = reactive(1);
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
            step: 1,
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
                    // resized image as canvas
                    new PixelCanvas(res.buf),
                    // swatches of dominant colors
                    div(
                        {},
                        svgSwatches(
                            res.colors.map((c) => c.col),
                            size
                        )
                    ),
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
