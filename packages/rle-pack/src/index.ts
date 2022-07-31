import { BitInputStream } from "@thi.ng/bitstream/input";
import { BitOutputStream } from "@thi.ng/bitstream/output";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

export type RLESizes = [number, number, number, number];

/**
 * Compresses input using dynamically sized RLE compression and returns
 * result as `Uint8Array`.
 *
 * @param src -
 * @param num - number of input words
 * @param wordSize - in bits, range 1 - 32
 * @param rleSizes - run-length group sizes (in bits, max. 16)
 */
export const encode = (
	src: Iterable<number>,
	num: number,
	wordSize = 8,
	rleSizes: RLESizes = [3, 4, 8, 16]
) => {
	(wordSize < 1 || wordSize > 32) &&
		illegalArgs("word size (1-32 bits only)");
	const out = new BitOutputStream(Math.ceil((num * wordSize) / 8) + 4 + 2 + 1)
		.write(num, 32)
		.write(wordSize - 1, 5);
	rleSizes.forEach((x) => {
		(x < 1 || x > 16) && illegalArgs("RLE repeat size (1-16 bits only)");
		out.write(x - 1, 4);
	});
	const [rle0, rle1, rle2, rle3] = rleSizes.map((x) => 1 << x);
	const chunk: number[] = [];
	const n1 = num - 1;
	let val: number | undefined;
	let tail = true;
	let n = 0;
	let i = 0;
	const writeRLE = () => {
		const t = n < rle0 ? 0 : n < rle1 ? 1 : n < rle2 ? 2 : 3;
		out.writeBit(1);
		out.write(t, 2);
		out.write(n, rleSizes[t]);
		out.write(val!, wordSize);
		n = 0;
	};
	const writeChunk = () => {
		const m = chunk.length - 1;
		const t = m < rle0 ? 0 : m < rle1 ? 1 : m < rle2 ? 2 : 3;
		out.writeBit(0);
		out.write(t, 2);
		out.write(m, rleSizes[t]);
		out.writeWords(chunk, wordSize);
		chunk.length = 0;
	};
	for (let x of src) {
		if (val === undefined) {
			val = x;
		} else if (x !== val) {
			if (n > 0) {
				writeRLE();
			} else {
				chunk.push(val);
				if (chunk.length === rle3) {
					writeChunk();
				}
			}
			val = x;
		} else {
			if (chunk.length) {
				writeChunk();
			}
			if (++n === rle3) {
				n--;
				writeRLE();
				tail = i < n1;
			}
		}
		if (i === n1) {
			break;
		}
		i++;
	}
	if (chunk.length) {
		chunk.push(val!);
		writeChunk();
	} else if (tail) {
		writeRLE();
	}
	return out.bytes();
};

export const decode = (src: Uint8Array) => {
	const input = new BitInputStream(src);
	const num = input.read(32);
	const wordSize = input.read(5) + 1;
	const rleSizes = [0, 0, 0, 0].map(() => input.read(4) + 1);
	const out = arrayForWordSize(wordSize, num);
	let x, j;
	for (let i = 0; i < num; ) {
		x = input.readBit();
		j = i + 1 + input.read(rleSizes[input.read(2)]);
		if (x) {
			out.fill(input.read(wordSize), i, j);
			i = j;
		} else {
			for (; i < j; i++) {
				out[i] = input.read(wordSize);
			}
		}
	}
	return out;
};

const arrayForWordSize = (ws: number, n: number) => {
	return new (ws < 9 ? Uint8Array : ws < 17 ? Uint16Array : Uint32Array)(n);
};
