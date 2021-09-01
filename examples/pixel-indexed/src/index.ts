import { parseHex, srgbIntArgb32 } from "@thi.ng/color";
import { THEMES } from "@thi.ng/color-palettes";
import {
    ARGB8888,
    canvas2d,
    defIndexed,
    dominantColors,
    floatBuffer,
    FLOAT_RGB,
    imagePromise,
    PackedBuffer,
} from "@thi.ng/pixel";

(async () => {
    const img = await imagePromise("assets/test.jpg");

    const root = document.getElementById("app")!;
    root.appendChild(img);

    const processImage = (buf: PackedBuffer, palette: number[]) =>
        buf
            .copy()
            .dither(8, 3)
            .as(defIndexed(palette))
            .blitCanvas(canvas2d(buf.width, buf.height, root).canvas);

    // dither image and convert to indexed color using given palette
    const buf = PackedBuffer.fromImage(img, ARGB8888);

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
