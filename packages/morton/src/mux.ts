import type { FnN2, FnN3 } from "@thi.ng/api";
import { decode10, decode16, encode10, encode16 } from "./raw.js";
import {
	decodeScaled10,
	decodeScaled16,
	encodeScaled10,
	encodeScaled16,
} from "./scaled.js";

const MIN = [0, 0, 0];
const MAX = [1, 1, 1];

export const mux2: FnN2 = (x, y) => (encode16(x) | (encode16(y) << 1)) >>> 0;

export const mux3: FnN3 = (x, y, z) =>
	(encode10(x) | (encode10(y) << 1) | (encode10(z) << 2)) >>> 0;

export const demux2 = (n: number) => [decode16(n), decode16(n >>> 1)];

export const demux3 = (n: number) => [
	decode10(n),
	decode10(n >>> 1),
	decode10(n >>> 2),
];

export const muxScaled2 = (
	x: number,
	y: number,
	minx = 0,
	maxx = 1,
	miny = minx,
	maxy = maxx
) =>
	(encodeScaled16(x, minx, maxx) | (encodeScaled16(y, miny, maxy) << 1)) >>>
	0;

export const muxScaled3 = (
	x: number,
	y: number,
	z: number,
	minx = 0,
	maxx = 1,
	miny = minx,
	maxy = maxx,
	minz = minx,
	maxz = maxx
) =>
	(encodeScaled10(x, minx, maxx) |
		(encodeScaled10(y, miny, maxy) << 1) |
		(encodeScaled10(z, minz, maxz) << 2)) >>>
	0;

export const demuxScaled2 = (
	n: number,
	minx = 0,
	maxx = 1,
	miny = minx,
	maxy = maxx
) => [decodeScaled16(n, minx, maxx), decodeScaled16(n >>> 1, miny, maxy)];

export const demuxScaled3 = (
	n: number,
	minx = 0,
	maxx = 1,
	miny = minx,
	maxy = maxx,
	minz = minx,
	maxz = maxx
) => [
	decodeScaled10(n, minx, maxx),
	decodeScaled10(n >>> 1, miny, maxy),
	decodeScaled10(n >>> 2, minz, maxz),
];

export const muxScaled2v = (
	v: ArrayLike<number>,
	min: ArrayLike<number> = MIN,
	max: ArrayLike<number> = MAX
) => muxScaled2(v[0], v[1], min[0], max[0], min[1], max[1]);

export const muxScaled3v = (
	v: ArrayLike<number>,
	min: ArrayLike<number> = MIN,
	max: ArrayLike<number> = MAX
) =>
	muxScaled3(
		v[0],
		v[1],
		v[2],
		min[0],
		max[0],
		min[1],
		max[1],
		min[2],
		max[2]
	);

export const demuxScaled2v = (
	n: number,
	min: ArrayLike<number> = MIN,
	max: ArrayLike<number> = MAX
) => demuxScaled2(n, min[0], max[0], min[1], max[1]);

export const demuxScaled3v = (
	n: number,
	min: ArrayLike<number> = MIN,
	max: ArrayLike<number> = MAX
) => demuxScaled3(n, min[0], max[0], min[1], max[1], min[2], max[2]);
