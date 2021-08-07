import { assert } from "@thi.ng/api";
import { BASE62, BaseN } from "@thi.ng/base-n";
import { IRandom, randomBytes, randomBytesFrom } from "@thi.ng/random";
import { padLeft } from "@thi.ng/strings";
import type { IKSUID, KSUIDOpts } from "./api";

/**
 * Abstract base class for both 32 & 64bit implementations. See {@link KSUID}
 * and {@link KSUID64}.
 */
export abstract class AKSUID implements IKSUID {
    readonly size: number;
    readonly base: BaseN;
    readonly epoch: number;
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
        this.pad = padLeft(
            this.base.size(2 ** (this.size * 8) - 1),
            this.base.base[0]
        );
    }

    next() {
        return this.format(this.nextBinary());
    }

    nextBinary() {
        const buf = this.timeOnlyBinary();
        return this.rnd
            ? randomBytesFrom(this.rnd, buf, this.epochSize)
            : randomBytes(buf, this.epochSize);
    }

    timeOnly(epoch?: number) {
        return this.format(this.timeOnlyBinary(epoch));
    }

    abstract timeOnlyBinary(epoch?: number): Uint8Array;

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

    protected ensureTime(t: number) {
        assert(t >= 0, "configured base epoch must be in the past");
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
