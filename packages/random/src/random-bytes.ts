import { hasCrypto } from "@thi.ng/checks";
import type { IRandom } from "./api";
import { SYSTEM } from "./system";

/**
 * Fills given byte array with random values sourced from given {@link IRandom}
 * instance.
 *
 * @param rnd -
 * @param buf -
 */
export const randomBytesFrom = (rnd: IRandom, buf: Uint8Array) => {
    for (let i = buf.length; --i >= 0; ) {
        buf[i] = rnd.int() & 0xff;
    }
    return buf;
};

/**
 * Fills given byte array with random values. Wrapper for
 * `crypto.getRandomValues()` with automatic fallback to using `Math.random` if
 * platform doesn't provide global crypto instance.
 */
export const randomBytes = hasCrypto()
    ? (buf: Uint8Array) => window.crypto.getRandomValues(buf)
    : (buf: Uint8Array) => randomBytesFrom(SYSTEM, buf);
