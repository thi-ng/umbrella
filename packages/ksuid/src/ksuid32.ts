import { AKSUID } from "./aksuid.js";
import type { KSUIDOpts } from "./api.js";

const MAX_EPOCH = -1 >>> 0;

export class KSUID32 extends AKSUID {
	constructor(opts?: Partial<KSUIDOpts>) {
		super(4, {
			epoch: 1_600_000_000_000,
			bytes: 16,
			...opts,
		});
	}

	timeOnlyBinary(epoch = Date.now(), buf?: Uint8Array) {
		buf = buf || new Uint8Array(this.size);
		const t = this.ensureTime((epoch - this.epoch) / 1000, MAX_EPOCH) >>> 0;
		buf[0] = t >>> 24;
		buf[1] = (t >> 16) & 0xff;
		buf[2] = (t >> 8) & 0xff;
		buf[3] = t & 0xff;
		return buf;
	}

	parse(id: string) {
		const buf = new Uint8Array(this.size);
		this.base.decodeBytes(id, buf);
		return {
			epoch: this.u32(buf) * 1000 + this.epoch,
			id: buf.slice(4),
		};
	}
}

/**
 * Creates and returns a new 32bit epoch KSUID generator instance (w/ second
 * time precision).
 *
 * @param opts -
 */
export const defKSUID32 = (opts?: Partial<KSUIDOpts>): KSUID32 =>
	new KSUID32(opts);
