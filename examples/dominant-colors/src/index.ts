import { timed } from "@thi.ng/bench";
import { swatchesH } from "@thi.ng/color";
import { button, div, h1, inputFile } from "@thi.ng/hiccup-html";
import { svg } from "@thi.ng/hiccup-svg";
import {
    ABGR8888,
    dominantColors,
    floatBuffer,
    FLOAT_RGB,
    PackedBuffer,
} from "@thi.ng/pixel";
import {
    $compile,
    $input,
    $refresh,
    Component,
    NumOrElement,
} from "@thi.ng/rdom";
import { reactive, stream, sync } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { downloadACT } from "./palette";

/**
 * Converts image into pixel buffer, resizes it to max 256 pixels (longest side)
 * and applies k-means clustering to obtain dominant colors and their coverage.
 * Only colors with given `minArea` (normalized) are considered.
 *
 * @param img
 * @param num
 * @param minArea
 */
const processImage = (img: HTMLImageElement, num: number, minArea = 0.025) =>
    timed(() => {
        let buf = PackedBuffer.fromImage(img, ABGR8888);
        buf = buf.scale(256 / Math.max(buf.width, buf.height), "nearest");
        const colors = dominantColors(floatBuffer(buf, FLOAT_RGB), num).filter(
            (c) => c.area >= minArea
        );
        return { buf, colors };
    });

// images read from files
const image = stream<HTMLImageElement>();
// number of dominant colors to extract
const num = reactive(5);
// dummy stream to retrigger updates
const update = reactive("");

// stream combinator & image processor
const result = sync({
    src: {
        image,
        num,
        _: update,
    },
    xform: map((params) => processImage(params.image, params.num)),
});

// stream of input files
const file = stream<File>();
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

// thi.ng/rdom UI component
// creates a canvas element and blits given pixel buffer into it
// when the component mounts
class PixelCanvas extends Component {
    constructor(protected buffer: PackedBuffer) {
        super();
    }

    async mount(parent: Element, index?: NumOrElement) {
        const buf = this.buffer;
        this.el = this.$el(
            "canvas",
            { width: buf.width, height: buf.height },
            null,
            parent,
            index
        );
        buf.blitCanvas(<HTMLCanvasElement>this.el);
        return this.el;
    }
}

// main UI
$compile(
    div(
        {},
        h1({}, "Dominant colors"),
        inputFile(".db.mv3", {
            accept: ["image/jpg", "image/png", "image/gif"],
            multiple: false,
            onchange: (e) => file.next((<HTMLInputElement>e.target).files![0]),
        }),
        button(".db.mv3", { onclick: $input(update) }, "update"),
        div(
            {},
            // this part of the UI will be replaced for each new processed image
            $refresh<ReturnType<typeof processImage>>(result, async (res) =>
                div(
                    {},
                    // resized image as canvas
                    new PixelCanvas(res.buf),
                    // swatches of dominant colors
                    div(
                        ".mv3",
                        {},
                        svg(
                            {
                                width: res.colors.length * 50,
                                height: 50,
                                convert: true,
                            },
                            swatchesH(
                                res.colors.map((c) => c.color),
                                50,
                                50,
                                { stroke: "black" }
                            )
                        )
                    ),
                    // download palette button
                    button(
                        ".db.mv3",
                        {
                            onclick: () =>
                                downloadACT(res.colors.map((c) => c.color)),
                        },
                        "download .act palette"
                    )
                )
            )
        )
    )
).mount(document.getElementById("app")!);
