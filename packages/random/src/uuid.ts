import { uuid as $uuid } from "@thi.ng/hex";
import type { IRandom } from "./api.js";
import { randomBytes, randomBytesFrom } from "./random-bytes.js";

/**
 * Depending on if `rnd` is given, uses {@link randomBytesFrom} or
 * {@link randomBytes} to fill given (optional) byte array with a new UUIDv4.
 * Creates new Uint8Array if none given.
 *
 * @param buf -
 * @param rnd -
 */
export const uuidv4Bytes = (buf?: Uint8Array, rnd?: IRandom) => {
	buf = buf || new Uint8Array(16);
	buf = rnd ? randomBytesFrom(rnd, buf) : randomBytes(buf);
	buf[6] = 0x40 | (buf[6] & 0x0f);
	buf[8] = 0x80 | (buf[8] & 0x3f);
	return buf;
};

/** @internal */
const __buf = new Uint8Array(16);

/**
 * Returns a UUID string, either from given byte array, or if omitted, using a
 * new UUID v4 produced by {@link uuidv4Bytes}.
 *
 * @param id - byte array
 * @param i - start index
 */
export const uuid = (id?: ArrayLike<number>, i = 0) =>
	$uuid(id || uuidv4Bytes(__buf), i);
