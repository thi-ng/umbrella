import {
    ARGBBuffer,
    canvas2d,
    Channel,
    imagePromise
} from "@thi.ng/pixel";
import IMG from "../assets/haystack.jpg";

// init 32bit packed ARGB pixel buffer from image (resized to 256x256)
ARGBBuffer.fromImagePromise(imagePromise(IMG), 256, 256).then((buf) => {
    // extract sub-image
    const region = buf.getRegion(32, 96, 128, 64);
    // copy region back at new position
    region.blit(buf, 96, 32);

    // create html canvas
    const ctx = canvas2d(buf.width, buf.height * 3);

    // write pixel buffer to canvas
    buf.blitCanvas(ctx.canvas);

    // manipulate single color channel
    const id = Channel.RED;
    const ch = buf.getChannel(id).invert();
    for (let y = 0; y < ch.height; y += 2) {
        for (let x = (y >> 1) & 1; x < ch.width; x += 2) {
            ch.setAt(x, y, 0xff);
        }
    }
    // replace original channel
    buf.setChannel(id, ch);
    // write pixel buffer
    buf.blitCanvas(ctx.canvas, 0, buf.height);
    // create & write grayscale version (uint8 buffer)
    buf.grayscale().blitCanvas(ctx.canvas, 0, buf.height * 2);

    document.body.appendChild(ctx.canvas);
});
