import type { BaseN } from "@thi.ng/base-n";
import type { IRandom } from "@thi.ng/random";

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
     * Number of bytes for random payload. By default, the 32 bit version uses
     * 16 bytes, the 64bit version only 12 (but also has a 1000x smaller
     * timespan / collision space).
     *
     * @defaultValue 16 or 12
     */
    bytes: number;
    /**
     * Time offset in seconds, relative to standard Unix epoch. This is used to
     * extend the time headroom of IDs into the future.
     *
     * @remarks
     * The default value (for both 32 & 64bit impls) is approx. 2020-09-13,
     * meaning this is the T0 epoch for all IDs (providing an additional ~50
     * year lifespan compared to the standard 1970-01-01 epoch)
     *
     * @defaultValue 1_600_000_000 or 1_600_000_000_000
     */
    epoch: number;
}
