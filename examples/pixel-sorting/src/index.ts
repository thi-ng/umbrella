import { luminanceSrgb, sortMapped, srgb } from "@thi.ng/color";
import {
    checkbox,
    div,
    inputFile,
    inputNumber,
    InputNumericAttribs,
    inputRange,
    label,
} from "@thi.ng/hiccup-html";
import { Interval } from "@thi.ng/intervals";
import { ABGR8888, FloatBuffer, FLOAT_RGBA, PackedBuffer } from "@thi.ng/pixel";
import { SYSTEM } from "@thi.ng/random";
import { $compile, $refresh, Component, NumOrElement } from "@thi.ng/rdom";
import { CloseMode, reactive, Stream, stream, sync } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";

interface ProcessParams {
    iter: number;
    horizontal: boolean;
    reverse: boolean;
    min: number;
    max: number;
}

/**
 * Takes a floating point pixel buffer and performs randomized pixel sorting
 * based on given config options.
 *
 * @param buf
 * @param param1
 */
const pixelSortBuffer = (
    buf: FloatBuffer,
    { iter, horizontal, reverse, min, max }: ProcessParams
) => {
    const { pixels, width, height } = buf;
    const w4 = width * 4;
    const row = Interval.closedOpen(0, width);
    const column = Interval.closedOpen(0, height);
    for (let i = iter; --i >= 0; ) {
        const num = SYSTEM.minmax(min, max) | 0;
        const n2 = num >> 1;
        // random start/pixel position in image
        const x = SYSTEM.minmax(horizontal ? -n2 : 0, width) | 0;
        const y = SYSTEM.minmax(horizontal ? 0 : -n2, height) | 0;
        // build & clamp intervals so that depending on process direction
        // we're not reading beyond RHS of selected row or bottom of selected column
        const ix = Interval.closedOpen(x, x + num).intersection(row)!;
        const iy = Interval.closedOpen(y, y + num).intersection(column)!;
        // skip if interval is empty
        if (!(ix && iy) || !ix.size() || !iy.size()) continue;
        // memory map selected pixels in either horizontal or vertical order
        // `mapBuffer()` returns an array of sRGB views of the underlying pixel buffer
        // if horizontal=false, there will be width*4 elements between each selected pixel
        const strip = srgb.mapBuffer(
            // buffer to map
            pixels,
            // num pixels to map
            (horizontal ? ix : iy).size(),
            // start index in pixel buffer
            (iy.l * width + ix.l) << 2,
            // channel stride
            1,
            // pixel stride
            horizontal ? 4 : w4
        );
        // now we're sorting these selected pixels in place (i.e. directly
        // within the pixel buffer) and by luminance
        sortMapped(strip, luminanceSrgb, reverse);
        // mark sorted pixels
        // strip.forEach((x) => ((x[0] += 0.05), x.clamp()));
    }
    return buf;
};

const processImage = (img: HTMLImageElement, opts: ProcessParams) =>
    pixelSortBuffer(
        FloatBuffer.fromPacked(
            PackedBuffer.fromImage(img, ABGR8888),
            FLOAT_RGBA
        ),
        opts
    );

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
    constructor(protected buffer: FloatBuffer) {
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
        ["h1", {}, "Glitch my pic!"],
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
            $refresh<FloatBuffer>(result, async (buf) => new PixelCanvas(buf))
        )
    )
).mount(document.getElementById("app")!);
