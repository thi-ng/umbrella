import { equiv } from "@thi.ng/equiv";
import * as assert from "assert";
import {
    ABGRBuffer,
    ARGBBuffer,
    Channel,
    FloatBuffer,
    RGBAFloatBuffer,
    Uint8Buffer
} from "../src/index";

describe("pixel", () => {
    it("ABGR.getChannel", () => {
        const buf = new ABGRBuffer(1, 1, new Uint32Array([0xffaabbcc]));
        assert.equal(buf.getChannel(Channel.RED).pixels[0], 0xcc, "red");
        assert.equal(buf.getChannel(Channel.GREEN).pixels[0], 0xbb, "green");
        assert.equal(buf.getChannel(Channel.BLUE).pixels[0], 0xaa, "blue");
        assert.equal(buf.getChannel(Channel.ALPHA).pixels[0], 0xff, "alpha");
    });

    it("ARGB.getChannel", () => {
        const buf = new ARGBBuffer(1, 1, new Uint32Array([0xffaabbcc]));
        assert.equal(buf.getChannel(Channel.RED).pixels[0], 0xaa, "red");
        assert.equal(buf.getChannel(Channel.GREEN).pixels[0], 0xbb, "green");
        assert.equal(buf.getChannel(Channel.BLUE).pixels[0], 0xcc, "blue");
        assert.equal(buf.getChannel(Channel.ALPHA).pixels[0], 0xff, "alpha");
    });

    it("RGBAFloat.getChannel", () => {
        const buf = new RGBAFloatBuffer(1, 1, new Float32Array([1, 2, 3, 4]));
        assert.equal(buf.getChannel(Channel.RED).pixels[0], 1, "red");
        assert.equal(buf.getChannel(Channel.GREEN).pixels[0], 2, "green");
        assert.equal(buf.getChannel(Channel.BLUE).pixels[0], 3, "blue");
        assert.equal(buf.getChannel(Channel.ALPHA).pixels[0], 4, "alpha");
    });

    it("ABGR.setChannel", () => {
        const buf = new ABGRBuffer(1, 1, new Uint32Array([0xffaabbcc]));
        const r = new Uint8Buffer(1, 1, new Uint8Array([0x11]));
        const g = new Uint8Buffer(1, 1, new Uint8Array([0x22]));
        const b = new Uint8Buffer(1, 1, new Uint8Array([0x33]));
        const a = new Uint8Buffer(1, 1, new Uint8Array([0x44]));
        // prettier-ignore
        assert.equal(buf.setChannel(Channel.RED,r).pixels[0], 0xffaabb11, "red");
        // prettier-ignore
        assert.equal(buf.setChannel(Channel.GREEN,g).pixels[0], 0xffaa2211, "green");
        // prettier-ignore
        assert.equal(buf.setChannel(Channel.BLUE,b).pixels[0], 0xff332211, "blue");
        // prettier-ignore
        assert.equal(buf.setChannel(Channel.ALPHA,a).pixels[0], 0x44332211, "alpha");
    });

    it("ARGB.setChannel", () => {
        const buf = new ARGBBuffer(1, 1, new Uint32Array([0xffaabbcc]));
        const r = new Uint8Buffer(1, 1, new Uint8Array([0x11]));
        const g = new Uint8Buffer(1, 1, new Uint8Array([0x22]));
        const b = new Uint8Buffer(1, 1, new Uint8Array([0x33]));
        const a = new Uint8Buffer(1, 1, new Uint8Array([0x44]));
        // prettier-ignore
        assert.equal(buf.setChannel(Channel.RED,r).pixels[0], 0xff11bbcc, "red");
        // prettier-ignore
        assert.equal(buf.setChannel(Channel.GREEN,g).pixels[0], 0xff1122cc, "green");
        // prettier-ignore
        assert.equal(buf.setChannel(Channel.BLUE,b).pixels[0], 0xff112233, "blue");
        // prettier-ignore
        assert.equal(buf.setChannel(Channel.ALPHA,a).pixels[0], 0x44112233, "alpha");
    });

    it("RGBAFloat.setChannel", () => {
        const buf = new RGBAFloatBuffer(1, 1, new Float32Array([1, 2, 3, 4]));
        const r = new FloatBuffer(1, 1, new Float32Array([0x11]));
        const g = new FloatBuffer(1, 1, new Float32Array([0x22]));
        const b = new FloatBuffer(1, 1, new Float32Array([0x33]));
        const a = new FloatBuffer(1, 1, new Float32Array([0x44]));
        // prettier-ignore
        assert(equiv(buf.setChannel(Channel.RED,r).pixels, [0x11,2,3,4]), "red");
        // prettier-ignore
        assert(equiv(buf.setChannel(Channel.GREEN,g).pixels, [0x11,0x22,3,4]), "green");
        // prettier-ignore
        assert(equiv(buf.setChannel(Channel.BLUE,b).pixels, [0x11,0x22,0x33,4]), "blue");
        // prettier-ignore
        assert(equiv(buf.setChannel(Channel.ALPHA,a).pixels, [0x11,0x22,0x33,0x44]), "alpha");
    });
});
