import {
    assert,
    IObjectOf,
    Type,
    UIntArray
} from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import {
    BlendFnInt,
    BlitOpts,
    PackedFormat,
    PackedFormatSpec
} from "./api";
import { imageCanvas } from "./canvas";
import { compileGrayFromABGR, compileGrayToABGR } from "./codegen";
import { defPackedFormat } from "./format";
import { clampRegion, ensureSize, prepRegions } from "./utils";

interface UIntArrayConstructor {
    new (size: number): UIntArray;
    new (elements: Iterable<number>): UIntArray;
    new (buf: ArrayBuffer, offset?: number, size?: number): UIntArray;
}

const CTORS: IObjectOf<UIntArrayConstructor> = {
    [Type.U8]: Uint8Array,
    [Type.U16]: Uint16Array,
    [Type.U32]: Uint32Array
};

export class PackedBuffer {
    static fromImage(
        img: HTMLImageElement,
        fmt: PackedFormat,
        width?: number,
        height = width
    ) {
        const ctx = imageCanvas(img, width, height);
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        const src = new Uint32Array(
            ctx.ctx.getImageData(0, 0, w, h).data.buffer
        );
        const dest = new CTORS[fmt.type](w * h);
        const from = fmt.fromABGR;
        for (let i = dest.length; --i >= 0; ) {
            dest[i] = from(src[i]);
        }
        return new PackedBuffer(w, h, fmt, dest);
    }

    width: number;
    height: number;
    pixels: UIntArray;
    format: PackedFormat;

    constructor(
        w: number,
        h: number,
        fmt: PackedFormat | PackedFormatSpec,
        pixels?: UIntArray
    ) {
        this.width = w;
        this.height = h;
        this.format = (<any>fmt).__compiled
            ? <PackedFormat>fmt
            : defPackedFormat(fmt);
        this.pixels = pixels || new CTORS[fmt.type](w * h);
    }

    as(fmt: PackedFormat) {
        return this.getRegion(0, 0, this.width, this.height, fmt);
    }

    getAt(x: number, y: number) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height
            ? this.pixels[(x | 0) + (y | 0) * this.width]
            : 0;
    }

    setAt(x: number, y: number, col: number) {
        x >= 0 &&
            x < this.width &&
            y >= 0 &&
            y < this.height &&
            (this.pixels[(x | 0) + (y | 0) * this.width] = col);
        return this;
    }

    blend(op: BlendFnInt, dest: PackedBuffer, opts?: Partial<BlitOpts>) {
        let sw = this.width;
        let dw = dest.width;
        const { sx, sy, dx, dy, rw, rh } = prepRegions(this, dest, opts);
        if (rw < 1 || rh < 1) return dest;
        const sbuf = this.pixels;
        const dbuf = dest.pixels;
        const sf = this.format.toABGR;
        const df1 = dest.format.toABGR;
        const df2 = dest.format.fromABGR;
        for (
            let si = (sx | 0) + (sy | 0) * sw,
                di = (dx | 0) + (dy | 0) * dw,
                yy = 0;
            yy < rh;
            yy++, si += sw, di += dw
        ) {
            for (let xx = 0; xx < rw; xx++) {
                dbuf[di + xx] = df2(op(sf(sbuf[si + xx]), df1(dbuf[di + xx])));
            }
        }
        return dest;
    }

    blit(dest: PackedBuffer, opts?: Partial<BlitOpts>) {
        let sw = this.width;
        let dw = dest.width;
        const { sx, sy, dx, dy, rw, rh } = prepRegions(this, dest, opts);
        if (rw < 1 || rh < 1) return dest;
        const sbuf = this.pixels;
        const dbuf = dest.pixels;
        const sf = this.format.toABGR;
        const df = dest.format.fromABGR;
        const blitRow =
            this.format !== dest.format
                ? (si: number, di: number) => {
                      for (let xx = 0; xx < rw; xx++) {
                          dbuf[di + xx] = df(sf(sbuf[si + xx]));
                      }
                  }
                : (si: number, di: number) =>
                      dbuf.set(sbuf.subarray(si, si + rw), di);
        for (
            let si = (sx | 0) + (sy | 0) * sw,
                di = (dx | 0) + (dy | 0) * dw,
                yy = 0;
            yy < rh;
            yy++, si += sw, di += dw
        ) {
            blitRow(si, di);
        }
        return dest;
    }

    blitCanvas(canvas: HTMLCanvasElement, x = 0, y = 0) {
        const ctx = canvas.getContext("2d")!;
        const idata = ctx.getImageData(x, y, this.width, this.height);
        const dest = new Uint32Array(idata.data.buffer);
        const src = this.pixels;
        const fmt = this.format.toABGR;
        for (let i = dest.length; --i >= 0; ) {
            dest[i] = fmt(src[i]);
        }
        ctx.putImageData(idata, x, y);
    }

    getRegion(
        x: number,
        y: number,
        width: number,
        height: number,
        fmt?: PackedFormat
    ) {
        const [sx, sy, w, h] = clampRegion(
            x,
            y,
            width,
            height,
            this.width,
            this.height
        );
        return this.blit(new PackedBuffer(w, h, fmt || this.format), {
            sx,
            sy,
            w,
            h
        });
    }

    getChannel(id: number) {
        const chan = this.format.channels[id];
        assert(chan != null, `invalid channel ID: ${id}`);
        // TODO memoize format
        const buf = new PackedBuffer(this.width, this.height, {
            type: Type.U8,
            size: chan.size,
            channels: [{ size: chan.size, lane: 3 }],
            fromABGR: compileGrayFromABGR(chan.size),
            toABGR: compileGrayToABGR(chan.size)
        });
        const src = this.pixels;
        const dest = buf.pixels;
        const get = chan.get;
        for (let i = src.length; --i >= 0; ) {
            dest[i] = get(src[i]);
        }
        return buf;
    }

    setChannel(id: number, src: PackedBuffer | number) {
        const chan = this.format.channels[id];
        assert(chan != null, `invalid channel ID: ${id}`);
        const dbuf = this.pixels;
        const set = chan.set;
        if (isNumber(src)) {
            for (let i = dbuf.length; --i >= 0; ) {
                dbuf[i] = set(dbuf[i], src);
            }
        } else {
            const sbuf = src.pixels;
            ensureSize(sbuf, this.width, this.height);
            for (let i = dbuf.length; --i >= 0; ) {
                dbuf[i] = set(dbuf[i], sbuf[i]);
            }
        }
        return this;
    }

    invert() {
        const pix = this.pixels;
        const fmt = this.format;
        const mask = Math.pow(2, fmt.size - fmt.alpha) - 1;
        for (let i = pix.length; --i >= 0; ) {
            pix[i] ^= mask;
        }
        return this;
    }
}
