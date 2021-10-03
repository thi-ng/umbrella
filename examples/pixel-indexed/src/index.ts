import { THEMES } from "@thi.ng/color-palettes";
import { parseHex } from "@thi.ng/color/css/parse-css";
import { srgbIntArgb32 } from "@thi.ng/color/srgb/srgb-int";
import { orderedDither } from "@thi.ng/pixel-dither/ordered";
import { canvas2d, imagePromise } from "@thi.ng/pixel/canvas";
import { dominantColors } from "@thi.ng/pixel/dominant-colors";
import { floatBuffer } from "@thi.ng/pixel/float";
import { ARGB8888 } from "@thi.ng/pixel/format/argb8888";
import { FLOAT_RGB } from "@thi.ng/pixel/format/float-rgb";
import { defIndexed } from "@thi.ng/pixel/format/indexed";
import { PackedBuffer, packedBufferFromImage } from "@thi.ng/pixel/packed";

(async () => {
    const img = await imagePromise("assets/test.jpg");

    const root = document.getElementById("app")!;
    root.appendChild(img);

    const processImage = (buf: PackedBuffer, palette: number[]) =>
        orderedDither(buf.copy(), 8, 3)
            .as(defIndexed(palette))
            .blitCanvas(canvas2d(buf.width, buf.height, root).canvas);

    // dither image and convert to indexed color using given palette
    const buf = packedBufferFromImage(img, ARGB8888);

    // extract palette from image and use it
    // to create indexed color version
    processImage(
        buf,
        dominantColors(floatBuffer(buf.scale(1 / 4), FLOAT_RGB), 6).map((c) =>
            srgbIntArgb32(c.color)
        )
    );

    // another version using a preset palette
    // see https://github.com/thi-ng/umbrella/tree/develop/packages/color-palettes#available-palettes
    processImage(buf, THEMES["00QMxescYuh8eYT39"].map(parseHex));
})();
