import { BASE32_CROCKFORD } from "@thi.ng/base-n/32";
import { AKSUID } from "./aksuid.js";
import type { KSUIDOpts } from "./api.js";

export class ULID extends AKSUID {
	constructor(opts?: Partial<KSUIDOpts>) {
		super(6, {
			epoch: 0,
			bytes: 10,
			base: BASE32_CROCKFORD,
			...opts,
		});
	}

	timeOnlyBinary(epoch = Date.now()) {
		const buf = new Uint8Array(this.size);
		const t = this.ensureTime(epoch - this.epoch);
		const h = (t / 0x1_0000_0000) >>> 0;
		const l = (t & 0xffff_ffff) >>> 0;
		buf.set([
			(h >> 8) & 0xff,
			h & 0xff,
			l >>> 24,
			(l >> 16) & 0xff,
			(l >> 8) & 0xff,
			l & 0xff,
		]);
		return buf;
	}

	parse(id: string) {
		const buf = new Uint8Array(this.size);
		this.base.decodeBytes(id, buf);
		return {
			epoch:
				((buf[0] << 8) | buf[1]) * 0x1_0000_0000 +
				this.u32(buf, 2) +
				this.epoch,
			id: buf.slice(6),
		};
	}
}

/**
 * Creates and returns a new ULID generator instance (w/ 48bit epoch millisecond
 * time precision).
 *
 * @remarks
 * https://github.com/ulid/spec
 *
 * @param opts -
 */
export const defULID = (opts?: Partial<KSUIDOpts>): ULID => new ULID(opts);
