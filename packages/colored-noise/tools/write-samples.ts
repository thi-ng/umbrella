import type { Fn } from "@thi.ng/api";
import { wavByteArray } from "@thi.ng/dsp-io-wav";
import { writeFileSync } from "fs";
import {
	blue,
	ColoredNoiseOpts,
	green,
	pink,
	red,
	violet,
	white,
} from "../src/index.js";

const FS = 44100;
const LENGTH = 5 * FS;

const write = (id: string, src: Iterable<number>) => {
	const path = `export/${id}.wav`;
	console.log(`writing: ${path}...`);
	writeFileSync(
		path,
		wavByteArray(
			{ bits: 16, channels: 1, length: LENGTH, sampleRate: FS },
			src
		)
	);
};

const writeBatch = (
	id: string,
	fn: Fn<Partial<ColoredNoiseOpts>, Iterable<number>>,
	bins = [2, 4, 8, 16, 32]
) => {
	for (let n of bins) {
		write(`${id}-${n}`, fn({ bins: n }));
	}
};

writeBatch("blue", blue);
writeBatch("green", green);
writeBatch("pink", pink);
writeBatch("red", red);
writeBatch("violet", violet);

write("white", white());
