import { AKSUID } from "./aksuid";
import type { KSUIDOpts } from "./api";

export class KSUID extends AKSUID {
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
 * Creates and returns a new 32bit epoch KSUID instance (w/ second time
 * precision).
 *
 * @param opts
 */
export const defKSUID = (opts?: Partial<KSUIDOpts>): KSUID => new KSUID(opts);
