import { BitInputStream } from "@thi.ng/bitstream/input";
import { BitOutputStream } from "@thi.ng/bitstream/output";

const HIGH = 0x7fffff;
const HALF = 0x400000;
const QUARTER = 0x200000;
const THREE_QUARTER = 0x600000;
const INITIAL_READ = 23;
const FREQ = 257;

export const encodeBytes = (src: Uint8Array) => {
	const freq = new Uint32Array(FREQ).fill(1);
	const out = new BitOutputStream(Math.max(src.length >> 1, 1));
	const len = src.length;
	let total = FREQ;
	let lo = 0;
	let hi = HIGH;
	let _lo = lo;
	let _hi = hi;
	let step;
	let scale = 0;
	let curr = 0;
	let i, j;

	for (i = 0; i <= len; i++) {
		if (i === len) {
			lo = total - 1;
			hi = total;
		} else {
			curr = src[i];
			lo = 0;
			for (j = 0; j < curr; j++) {
				lo += freq[j];
			}
			hi = lo + freq[curr];
		}

		step = ((_hi - _lo + 1) / total) >>> 0;
		_hi = _lo + step * hi - 1;
		_lo += step * lo;

		while (true) {
			if (_hi < HALF) {
				out.writeBit(0);
				_lo <<= 1;
				_hi = (_hi << 1) + 1;
				scale && out.write(HIGH, scale);
			} else if (_lo >= HALF) {
				out.writeBit(1);
				_lo = (_lo - HALF) << 1;
				_hi = ((_hi - HALF) << 1) + 1;
				scale && out.write(0, scale);
			} else {
				break;
			}
			scale = 0;
		}

		while (_lo > QUARTER && _hi < THREE_QUARTER) {
			scale++;
			_lo = (_lo - QUARTER) << 1;
			_hi = ((_hi - QUARTER) << 1) + 1;
		}

		freq[curr]++;
		total++;
	}
	if (_lo < QUARTER) {
		out.writeBit(0);
		out.write(HIGH, scale + 1);
	} else {
		out.writeBit(1);
	}
	return out.bytes();
};

export const decodeBytes = (src: Uint8Array) => {
	const freq = new Uint32Array(FREQ).fill(1);
	const input = new BitInputStream(src);
	const nbits = input.length;
	const out = [];
	let total = FREQ;
	let current = 0;
	let lo = 0;
	let hi = HIGH;
	let _lo = lo;
	let _hi = hi;
	let step = 0;
	let buf = input.read(INITIAL_READ);
	let val;

	const read = () => (input.position < nbits ? input.readBit() : 0);

	while (true) {
		step = ((_hi - _lo + 1) / total) >>> 0;
		val = ((buf - _lo) / step) >>> 0;
		lo = 0;
		for (
			current = 0;
			current < 256 && lo + freq[current] <= val;
			current++
		) {
			lo += freq[current];
		}
		if (current === 256) break;

		out.push(current);
		hi = lo + freq[current];

		_hi = _lo + step * hi - 1;
		_lo += step * lo;

		while (true) {
			if (_hi < HALF) {
				buf <<= 1;
				_lo <<= 1;
				_hi = (_hi << 1) + 1;
			} else if (_lo >= HALF) {
				buf = (buf - HALF) << 1;
				_lo = (_lo - HALF) << 1;
				_hi = ((_hi - HALF) << 1) + 1;
			} else {
				break;
			}
			buf += read();
		}

		while (_lo > QUARTER && _hi < THREE_QUARTER) {
			_lo = (_lo - QUARTER) << 1;
			_hi = ((_hi - QUARTER) << 1) + 1;
			buf = (buf - QUARTER) << 1;
			buf += read();
		}

		freq[current]++;
		total++;
	}

	return new Uint8Array(out);
};
