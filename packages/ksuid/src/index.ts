import { assert } from "@thi.ng/api";
import { BASE62, BaseN } from "@thi.ng/base-n";
import { IRandom, randomBytes, randomBytesFrom } from "@thi.ng/random";
import { padLeft } from "@thi.ng/strings";

export interface KSUIDOpts {
    /**
     * {@link @this.ng/base-n#BaseN} instance for string encoding the generated
     * binary IDs.
     *
     * @defaultValue BASE62
     */
    base: BaseN;
    /**
     * Optional PRNG instance for sourcing random values (for development/debug
     * purposes only).
     *
     * @defaultValue window.crypto
     */
    rnd: IRandom;
    /**
     * Number of bytes for random payload.
     *
     * @defaultValue 16
     */
    bytes: number;
    /**
     * Time offset in seconds, relative to standard Unix epoch. This is used to
     * extend the time headroom of IDs into the future.
     *
     * @remarks
     * The default value is approx. 2020-09-13, meaning this is the T0 epoch for
     * all IDs (providing an additional ~50 year lifespan compared to the
     * standard 1970-01-01 epoch)
     *
     * @defaultValue 1_600_000_000
     */
    epoch: number;
}

export class KSUID {
    /**
     * Returns the byte size of a single ID, based on the KSUID's configuration.
     * The default config (payload 16 bytes) will result in 20-byte IDs (27
     * chars base62 encoded).
     */
    readonly size: number;

    protected base: BaseN;
    protected rnd?: IRandom;
    protected epoch: number;
    protected pad: (x: any) => string;

    constructor(opts?: Partial<KSUIDOpts>) {
        opts = {
            base: BASE62,
            epoch: 1_600_000_000,
            bytes: 16,
            ...opts,
        };
        this.base = opts.base!;
        this.rnd = opts.rnd;
        this.epoch = opts.epoch!;
        this.size = 4 + opts.bytes!;
        this.pad = padLeft(
            this.base.size(2 ** (this.size * 8) - 1),
            this.base.base[0]
        );
    }

    /**
     * Returns a new baseN encoded ID string.
     */
    next() {
        return this.pad(this.base.encodeBytes(this.nextBinary()));
    }

    /**
     * Returns a new ID as byte array.
     */
    nextBinary() {
        const buf = new Uint8Array(this.size);
        const t = (Date.now() / 1000 - this.epoch) & 0xffffffff;
        buf.set([t >>> 24, (t >>> 16) & 0xff, (t >>> 8) & 0xff, t & 0xff]);
        return this.rnd
            ? randomBytesFrom(this.rnd, buf, 4)
            : randomBytes(buf, 4);
    }

    /**
     * Returns baseN encoded version of given binary ID (generated via
     * `.nextBinary()`).
     */
    format(buf: Uint8Array) {
        assert(
            buf.length == this.size,
            `illegal KSUID size, expected ${this.size} bytes`
        );
        return this.pad(this.base.encodeBytes(buf));
    }
}

/**
 *
 * @param opts
 */
export const defKSUID = (opts?: Partial<KSUIDOpts>): KSUID => new KSUID(opts);
