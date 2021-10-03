import { timed } from "@thi.ng/bench/timed";
import { abgr32 } from "@thi.ng/color/int/int";
import { luminanceAbgr32 } from "@thi.ng/color/ops/luminance-rgb";
import { sortMapped } from "@thi.ng/color/ops/sort";
import { div } from "@thi.ng/hiccup-html/blocks";
import {
    checkbox,
    inputFile,
    inputNumber,
    InputNumericAttribs,
    inputRange,
    label,
} from "@thi.ng/hiccup-html/forms";
import { h1 } from "@thi.ng/hiccup-html/sections";
import { closedOpen, intersection } from "@thi.ng/intervals";
import { ABGR8888 } from "@thi.ng/pixel/format/abgr8888";
import { PackedBuffer, packedBufferFromImage } from "@thi.ng/pixel/packed";
import { SYSTEM } from "@thi.ng/random/system";
import type { NumOrElement } from "@thi.ng/rdom";
import { $compile } from "@thi.ng/rdom/compile";
import { Component } from "@thi.ng/rdom/component";
import { $refresh } from "@thi.ng/rdom/switch";
import { CloseMode } from "@thi.ng/rstream/api";
import { reactive, Stream, stream } from "@thi.ng/rstream/stream";
import { sync } from "@thi.ng/rstream/sync";
import { map } from "@thi.ng/transducers/map";

interface ProcessParams {
    iter: number;
    horizontal: boolean;
    reverse: boolean;
    min: number;
    max: number;
}

/**
 * Takes a ABGR pixel buffer and performs randomized pixel sorting based on
 * given config options.
 *
 * @param buf
 * @param param1
 */
const pixelSortBuffer = (
    buf: PackedBuffer,
    { iter, horizontal, reverse, min, max }: ProcessParams
) => {
    const { pixels, width, height } = buf;
    const row = closedOpen(0, width);
    const column = closedOpen(0, height);
    for (let i = iter; --i >= 0; ) {
        const num = SYSTEM.minmax(min, max) | 0;
        const n2 = num >> 1;
        // random start/pixel position in image
        const x = SYSTEM.minmax(horizontal ? -n2 : 0, width) | 0;
        const y = SYSTEM.minmax(horizontal ? 0 : -n2, height) | 0;
        // build & clamp intervals so that depending on process direction
        // we're not reading beyond RHS of selected row or bottom of selected column
        const ix = intersection(closedOpen(x, x + num), row)!;
        const iy = intersection(closedOpen(y, y + num), column)!;
        // skip if interval is empty
        if (!(ix && iy && ix.size && iy.size)) continue;
        // memory map selected pixels in either horizontal or vertical order
        // `mapBuffer()` returns an array of sRGB views of the underlying pixel buffer.
        // if vertical order, there will be `width` elements between each selected pixel
        const strip = abgr32.mapBuffer(
            // buffer to map
            pixels,
            // num pixels to map
            (horizontal ? ix : iy).size,
            // start index in pixel buffer
            iy.l * width + ix.l,
            // channel stride (ignored in our case)
            1,
            // pixel stride
            horizontal ? 1 : width
        );
        // now we're sorting these selected pixels in place (i.e. directly
        // within the pixel buffer) and by luminance
        sortMapped(strip, luminanceAbgr32, reverse);
        // mark sorted pixels
        // strip.forEach((x) => ((x[0] += 0.05), x.clamp()));
    }
    return buf;
};

const processImage = (img: HTMLImageElement, opts: ProcessParams) =>
    timed(() => pixelSortBuffer(packedBufferFromImage(img, ABGR8888), opts));

// stream of input files
const file = stream<File>();
// images read from files
const image = stream<HTMLImageElement>();

// processing params
// number of iterations
const iter = reactive(1000);
// sort slice min pixel width
const min = reactive(50);
// sort slice max pixel width
const max = reactive(200);
// sort pixels horizontally
const horizontal = reactive(true);
// sort pixels in reverse order (bright -> dark)
const reverse = reactive(false);

// stream combinator & image processor
const result = sync({
    src: {
        image,
        iter,
        horizontal,
        reverse,
        min,
        max,
    },
    closeOut: CloseMode.NEVER,
    xform: map((params) => processImage(params.image, params)),
});

// triggers reading file as an image
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

// UI component, grouping a form field label & input slider
// slider is linked w/ given value stream
const labeledRange = (
    stream: Stream<number>,
    id: string,
    labelBody: string,
    opts: Partial<InputNumericAttribs>
) => {
    const onchange = (e: InputEvent) =>
        stream.next(parseInt((<HTMLInputElement>e.target).value));
    return div(
        ".mb2",
        {},
        label(".dib.w4", { for: id }, labelBody),
        inputRange({
            ...opts,
            id,
            value: stream,
            onchange,
        }),
        inputNumber(".ml3.w4.tr", {
            ...opts,
            value: stream,
            onchange,
        })
    );
};

// UI component, grouping a form field label & checkbox
// checkbox is linked w/ given value stream
const labeledCheckbox = (
    stream: Stream<boolean>,
    id: string,
    labelBody: string
) =>
    div(
        ".mb2",
        {},
        label(".dib.w4", { for: id }, labelBody),
        checkbox({
            id,
            checked: stream,
            onchange: (e) =>
                stream.next(!!(<HTMLInputElement>e.target).checked),
        })
    );

// compile & mount main UI
$compile(
    div(
        {},
        h1({}, "Glitch my pic!"),
        div(
            ".mb2",
            {},
            label(".dib.w4", { for: "file" }, "Image"),
            inputFile({
                id: "file",
                accept: ["image/jpg", "image/png", "image/gif"],
                multiple: false,
                onchange: (e) =>
                    file.next((<HTMLInputElement>e.target).files![0]),
            })
        ),
        labeledRange(iter, "iter", "Iterations", {
            min: 0,
            max: 50000,
            step: 1000,
        }),
        labeledRange(min, "min", "Min. scatter", {
            min: 0,
            max: 200,
            step: 5,
        }),
        labeledRange(max, "max", "Max. scatter", {
            min: 0,
            max: 200,
            step: 5,
        }),
        labeledCheckbox(horizontal, "horizontal", "Horizontal"),
        labeledCheckbox(reverse, "order", "Reverse order"),
        div(
            {},
            $refresh<PackedBuffer>(result, async (buf) => new PixelCanvas(buf))
        )
    )
).mount(document.getElementById("app")!);
