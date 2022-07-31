import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
	ABGR8888,
	ARGB1555,
	ARGB4444,
	ARGB8888,
	BGR888,
	GRAY16,
	GRAY8,
	GRAY_ALPHA16,
	GRAY_ALPHA8,
	IntFormat,
	RGB565,
	RGB888,
} from "../src/index.js";
// import { equiv } from "@thi.ng/equiv";

const testFromABGR = (fmt: IntFormat, specs: number[]) => {
	assert.strictEqual(fmt.fromABGR(0xff000000) >>> 0, specs[0], "from_a");
	assert.strictEqual(fmt.fromABGR(0xffff0000) >>> 0, specs[1], "from_b");
	assert.strictEqual(fmt.fromABGR(0xff00ff00) >>> 0, specs[2], "from_g");
	assert.strictEqual(fmt.fromABGR(0xff0000ff) >>> 0, specs[3], "from_r");
};

const testToABGR = (fmt: IntFormat, specs: number[]) => {
	assert.strictEqual(fmt.toABGR(specs[0]) >>> 0, 0xff000000, "to_a");
	assert.strictEqual(fmt.toABGR(specs[1]) >>> 0, 0xffff0000, "to_b");
	assert.strictEqual(fmt.toABGR(specs[2]) >>> 0, 0xff00ff00, "to_g");
	assert.strictEqual(fmt.toABGR(specs[3]) >>> 0, 0xff0000ff, "to_r");
};

group("pixel", {
	GRAY8: () => {
		testFromABGR(GRAY8, [0, 29, 150, 76]);
	},

	GRAY_ALPHA8: () => {
		testFromABGR(GRAY_ALPHA8, [0xff00, 0xff1d, 0xff96, 0xff4c]);
	},

	GRAY16: () => {
		testFromABGR(GRAY16, [0, 0x1d1d, 0x9696, 0x4c4c]);
	},

	GRAY_ALPHA16: () => {
		testFromABGR(
			GRAY_ALPHA16,
			[0xffff0000, 0xffff1d1d, 0xffff9696, 0xffff4c4c]
		);
	},

	ARGB4444: () => {
		const specs = [0xf000, 0xf00f, 0xf0f0, 0xff00];
		testFromABGR(ARGB4444, specs);
		testToABGR(ARGB4444, specs);
	},

	ARGB1555: () => {
		const specs = [0x8000, 0x801f, 0x83e0, 0xfc00];
		testFromABGR(ARGB1555, specs);
		testToABGR(ARGB1555, specs);
	},

	RGB565: () => {
		const specs = [0, 0x1f, 0x7e0, 0xf800];
		testFromABGR(RGB565, specs);
		testToABGR(RGB565, specs);
	},

	RGB888: () => {
		const specs = [0, 0xff, 0xff00, 0xff0000];
		testFromABGR(RGB888, specs);
		testToABGR(RGB888, specs);
	},

	ARGB8888: () => {
		const specs = [0xff000000, 0xff0000ff, 0xff00ff00, 0xffff0000];
		testFromABGR(ARGB8888, specs);
		testToABGR(ARGB8888, specs);
	},

	BGR888: () => {
		testFromABGR(BGR888, [0, 0xff0000, 0xff00, 0xff]);
	},

	ABGR8888: () => {
		testFromABGR(
			ABGR8888,
			[0xff000000, 0xffff0000, 0xff00ff00, 0xff0000ff]
		);
	},

	// "ABGR.getChannel": () => {
	//     const buf = new ABGRBuffer(1, 1, new Uint32Array([0xffaabbcc]));
	//     assert.strictEqual(buf.getChannel(Channel.RED).data[0], 0xcc, "red");
	//     assert.strictEqual(buf.getChannel(Channel.GREEN).data[0], 0xbb, "green");
	//     assert.strictEqual(buf.getChannel(Channel.BLUE).data[0], 0xaa, "blue");
	//     assert.strictEqual(buf.getChannel(Channel.ALPHA).data[0], 0xff, "alpha");
	// },

	// "ARGB.getChannel": () => {
	//     const buf = new ARGBBuffer(1, 1, new Uint32Array([0xffaabbcc]));
	//     assert.strictEqual(buf.getChannel(Channel.RED).data[0], 0xaa, "red");
	//     assert.strictEqual(buf.getChannel(Channel.GREEN).data[0], 0xbb, "green");
	//     assert.strictEqual(buf.getChannel(Channel.BLUE).data[0], 0xcc, "blue");
	//     assert.strictEqual(buf.getChannel(Channel.ALPHA).data[0], 0xff, "alpha");
	// },

	// "RGBAFloat.getChannel": () => {
	//     const buf = new RGBAFloatBuffer(1, 1, new Float32Array([1, 2, 3, 4]));
	//     assert.strictEqual(buf.getChannel(Channel.RED).data[0], 1, "red");
	//     assert.strictEqual(buf.getChannel(Channel.GREEN).data[0], 2, "green");
	//     assert.strictEqual(buf.getChannel(Channel.BLUE).data[0], 3, "blue");
	//     assert.strictEqual(buf.getChannel(Channel.ALPHA).data[0], 4, "alpha");
	// },

	// "ABGR.setChannel": () => {
	//     const buf = new ABGRBuffer(1, 1, new Uint32Array([0xffaabbcc]));
	//     const r = new Uint8Buffer(1, 1, new Uint8Array([0x11]));
	//     const g = new Uint8Buffer(1, 1, new Uint8Array([0x22]));
	//     const b = new Uint8Buffer(1, 1, new Uint8Array([0x33]));
	//     const a = new Uint8Buffer(1, 1, new Uint8Array([0x44]));
	//     // prettier-ignore
	//     assert.strictEqual(buf.setChannel(Channel.RED,r).data[0], 0xffaabb11, "red");
	//     // prettier-ignore
	//     assert.strictEqual(buf.setChannel(Channel.GREEN,g).data[0], 0xffaa2211, "green");
	//     // prettier-ignore
	//     assert.strictEqual(buf.setChannel(Channel.BLUE,b).data[0], 0xff332211, "blue");
	//     // prettier-ignore
	//     assert.strictEqual(buf.setChannel(Channel.ALPHA,a).data[0], 0x44332211, "alpha");
	// },

	// "ARGB.setChannel": () => {
	//     const buf = new ARGBBuffer(1, 1, new Uint32Array([0xffaabbcc]));
	//     const r = new Uint8Buffer(1, 1, new Uint8Array([0x11]));
	//     const g = new Uint8Buffer(1, 1, new Uint8Array([0x22]));
	//     const b = new Uint8Buffer(1, 1, new Uint8Array([0x33]));
	//     const a = new Uint8Buffer(1, 1, new Uint8Array([0x44]));
	//     // prettier-ignore
	//     assert.strictEqual(buf.setChannel(Channel.RED,r).data[0], 0xff11bbcc, "red");
	//     // prettier-ignore
	//     assert.strictEqual(buf.setChannel(Channel.GREEN,g).data[0], 0xff1122cc, "green");
	//     // prettier-ignore
	//     assert.strictEqual(buf.setChannel(Channel.BLUE,b).data[0], 0xff112233, "blue");
	//     // prettier-ignore
	//     assert.strictEqual(buf.setChannel(Channel.ALPHA,a).data[0], 0x44112233, "alpha");
	// },

	// "RGBAFloat.setChannel": () => {
	//     const buf = new RGBAFloatBuffer(1, 1, new Float32Array([1, 2, 3, 4]));
	//     const r = new FloatBuffer(1, 1, new Float32Array([0x11]));
	//     const g = new FloatBuffer(1, 1, new Float32Array([0x22]));
	//     const b = new FloatBuffer(1, 1, new Float32Array([0x33]));
	//     const a = new FloatBuffer(1, 1, new Float32Array([0x44]));
	//     // prettier-ignore
	//     assert.ok(equiv(buf.setChannel(Channel.RED,r).data, [0x11,2,3,4]), "red");
	//     // prettier-ignore
	//     assert.ok(equiv(buf.setChannel(Channel.GREEN,g).data, [0x11,0x22,3,4]), "green");
	//     // prettier-ignore
	//     assert.ok(equiv(buf.setChannel(Channel.BLUE,b).data, [0x11,0x22,0x33,4]), "blue");
	//     // prettier-ignore
	//     assert.ok(equiv(buf.setChannel(Channel.ALPHA,a).data, [0x11,0x22,0x33,0x44]), "alpha");
	// },
});
