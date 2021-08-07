import { AKSUID } from "./aksuid";
import type { KSUIDOpts } from "./api";

export class KSUID32 extends AKSUID {
    constructor(opts?: Partial<KSUIDOpts>) {
        super(4, {
            epoch: 1_600_000_000,
            bytes: 16,
            ...opts,
        });
    }

    timeOnlyBinary(epoch = Date.now()) {
        const buf = new Uint8Array(this.size);
        const t = this.ensureTime((epoch / 1000 - this.epoch) | 0);
        buf.set([t >>> 24, (t >> 16) & 0xff, (t >> 8) & 0xff, t & 0xff]);
        return buf;
    }

    parse(id: string) {
        const buf = new Uint8Array(this.size);
        this.base.decodeBytes(id, buf);
        return {
            epoch: (this.u32(buf) + this.epoch) * 1000,
            id: buf.slice(4),
        };
    }
}

/**
 * Creates and returns a new 32bit epoch KSUID generator instance (w/ second
 * time precision).
 *
 * @param opts
 */
export const defKSUID32 = (opts?: Partial<KSUIDOpts>): KSUID32 =>
    new KSUID32(opts);
