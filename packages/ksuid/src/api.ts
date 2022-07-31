import type { BaseN } from "@thi.ng/base-n";
import type { IRandom } from "@thi.ng/random";

export interface IKSUID {
	/**
	 * Byte size of a single ID, based on the KSUID's configuration. The default
	 * config will result in 20-byte IDs (27 chars base62 encoded).
	 */
	readonly size: number;
	readonly encodedSize: number;
	readonly base: BaseN;
	readonly epoch: number;
	readonly epochSize: number;

	/**
	 * Returns a new baseN encoded ID string.
	 */
	next(): string;

	/**
	 * Returns a new ID as byte array.
	 */
	nextBinary(): Uint8Array;

	/**
	 * Returns a new baseN encoded ID string for given `epoch` (default: current
	 * time) and with all random payload bytes set to 0.
	 *
	 * @param epoch -
	 */
	timeOnly(epoch?: number): string;

	/**
	 * Binary version of {@link KSUI.timeOnly}, but returns byte array. The
	 * first `epochSize` bytes will contain the timestamp.
	 *
	 * @param epoch -
	 */
	timeOnlyBinary(epoch?: number): Uint8Array;

	/**
	 * Returns baseN encoded version of given binary ID (generated via
	 * `.nextBinary()`).
	 */
	format(buf: Uint8Array): string;

	/**
	 * Takes a KSUID string (assumed to be generated with the same config as
	 * this instance) and parses it into an object of: `{ epoch, id }`, where
	 * `epoch` is the Unix epoch of the ID and `id` the random bytes.
	 *
	 * @remarks
	 * This operation requires `bigint` support by the host environment.
	 *
	 * @param id -
	 */
	parse(id: string): { epoch: number; id: Uint8Array };
}

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
