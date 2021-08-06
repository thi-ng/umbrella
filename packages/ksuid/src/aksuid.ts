import { assert } from "@thi.ng/api";
import { BASE62, BaseN } from "@thi.ng/base-n";
import { IRandom, randomBytes, randomBytesFrom } from "@thi.ng/random";
import { padLeft } from "@thi.ng/strings";
import type { KSUIDOpts } from "./api";

/**
 * Abstract base class for both 32 & 64bit implementations. See {@link KSUID}
 * and {@link KSUID64}.
 */
export abstract class AKSUID {
    /**
     * Returns the byte size of a single ID, based on the KSUID's configuration.
     * The default config will result in 20-byte IDs (27 chars base62 encoded).
     */
    readonly size: number;

    protected base: BaseN;
    protected rnd?: IRandom;
    protected epoch: number;
    protected pad: (x: any) => string;

    constructor(protected epochSize: number, opts: Partial<KSUIDOpts>) {
        this.base = opts.base || BASE62;
        this.rnd = opts.rnd;
        this.epoch = opts.epoch!;
        this.size = this.epochSize + opts.bytes!;
        this.pad = padLeft(
            this.base.size(2 ** (this.size * 8) - 1),
            this.base.base[0]
        );
    }

    /**
     * Returns a new baseN encoded ID string.
     */
    next() {
        return this.format(this.nextBinary());
    }

    /**
     * Returns a new ID as byte array.
     */
    nextBinary() {
        const buf = this.timeOnlyBinary();
        return this.rnd
            ? randomBytesFrom(this.rnd, buf, this.epochSize)
            : randomBytes(buf, this.epochSize);
    }

    /**
     * Returns a new baseN encoded ID string for given `epoch` (default: current
     * time) and with all random payload bytes set to 0.
     *
     * @param epoch
     */
    timeOnly(epoch?: number) {
        return this.format(this.timeOnlyBinary(epoch));
    }

    /**
     * Binary version of {@link KSUI.timeOnly}, but returns byte array. The
     * first `epochSize` bytes will contain the timestamp.
     *
     * @param epoch
     */
    abstract timeOnlyBinary(epoch?: number): Uint8Array;

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

    /**
     * Takes a KSUID string (assumed to be generated with the same config as
     * this instance) and parses it into an object of: `{ epoch, id }`, where
     * `epoch` is the Unix epoch of the ID and `id` the random bytes.
     *
     * @remarks
     * This operation requires `bigint` support by the host environment.
     *
     * @param id
     */
    abstract parse(id: string): { epoch: number; id: Uint8Array };

    protected ensureTime(t: number) {
        assert(t >= 0, "configured base epoch must be in the past");
        return t;
    }
}
