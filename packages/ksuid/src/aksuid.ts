import type { BaseN } from "@thi.ng/base-n";
import { BASE62 } from "@thi.ng/base-n/62";
import { assert } from "@thi.ng/errors/assert";
import type { IRandom } from "@thi.ng/random";
import { randomBytes, randomBytesFrom } from "@thi.ng/random/random-bytes";
import { padLeft } from "@thi.ng/strings/pad-left";
import type { IKSUID, KSUIDOpts } from "./api.js";

/**
 * Abstract base class for both 32 & 64bit implementations. See {@link KSUID32}
 * and {@link KSUID64}.
 */
export abstract class AKSUID implements IKSUID {
	readonly size: number;
	readonly encodedSize: number;
	readonly base: BaseN;
	readonly epoch: number;
	protected tmp: Uint8Array;
	protected rnd?: IRandom;
	protected pad: (x: any) => string;

	protected constructor(
		public readonly epochSize: number,
		opts: Partial<KSUIDOpts>
	) {
		this.base = opts.base || BASE62;
		this.rnd = opts.rnd;
		this.epoch = opts.epoch!;
		this.size = this.epochSize + opts.bytes!;
		this.encodedSize = this.base.size(2 ** (this.size * 8) - 1);
		this.pad = padLeft(this.encodedSize, this.base.base[0]);
		this.tmp = new Uint8Array(this.size);
	}

	next() {
		return this.format(this.nextBinary(this.tmp));
	}

	nextBinary(buf?: Uint8Array) {
		buf = this.timeOnlyBinary(undefined, buf);
		return this.rnd
			? randomBytesFrom(this.rnd, buf, this.epochSize)
			: randomBytes(buf, this.epochSize);
	}

	timeOnly(epoch?: number) {
		return this.format(
			this.timeOnlyBinary(epoch, this.tmp.fill(0, this.epochSize))
		);
	}

	abstract timeOnlyBinary(epoch?: number, buf?: Uint8Array): Uint8Array;

	fromEpoch(epoch?: number) {
		return this.format(this.fromEpochBinary(epoch, this.tmp));
	}

	fromEpochBinary(epoch?: number, buf?: Uint8Array) {
		buf = this.timeOnlyBinary(epoch, buf);
		return this.rnd
			? randomBytesFrom(this.rnd, buf, this.epochSize)
			: randomBytes(buf, this.epochSize);
	}

	format(buf: Uint8Array) {
		this.ensureSize(buf);
		return this.pad(this.base.encodeBytes(buf));
	}

	abstract parse(id: string): { epoch: number; id: Uint8Array };

	protected ensureSize(buf: Uint8Array) {
		assert(
			buf.length == this.size,
			`illegal KSUID size, expected ${this.size} bytes`
		);
		return buf;
	}

	protected ensureTime(t: number, max?: number) {
		assert(t >= 0, "configured base epoch must be in the past");
		max && assert(t <= max, `given epoch is out of range ([0...${max}])`);
		return t;
	}

	protected u32(buf: Uint8Array, i = 0) {
		return (
			((buf[i] << 24) |
				(buf[i + 1] << 16) |
				(buf[i + 2] << 8) |
				buf[i + 3]) >>>
			0
		);
	}
}
