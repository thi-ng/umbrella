import { benchmark } from "@thi.ng/bench";
import { fft } from "../src";

const genPulse = (n: number) => {
	const buf = new Float64Array(n);
	buf.fill(-1, 0, n / 2);
	buf.fill(1, n / 2, n);
	return buf;
};

const opts = { iter: 10000, warmup: 1000 };

for (let n of [128, 256, 1024, 2048, 4096, 16384]) {
	const src = genPulse(n);
	benchmark(() => fft(src.slice()), { ...opts, title: `fft(${n})` });
}
