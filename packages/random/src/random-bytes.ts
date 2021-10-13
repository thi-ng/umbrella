import { hasCrypto } from "@thi.ng/checks/has-crypto";
import type { IRandom } from "./api.js";
import { SYSTEM } from "./system.js";

/**
 * Fills given byte array with random values sourced from given {@link IRandom}
 * instance.
 *
 * @param rnd -
 * @param buf -
 * @param start -
 * @param end -
 */
export const randomBytesFrom = (
    rnd: IRandom,
    buf: Uint8Array,
    start = 0,
    end = buf.length
) => {
    for (let i = end; --i >= start; ) {
        buf[i] = rnd.int() & 0xff;
    }
    return buf;
};

/**
 * Fills given byte array with random values. Wrapper for
 * `crypto.getRandomValues()` with automatic fallback to using `Math.random` if
 * platform doesn't provide global crypto instance.
 *
 * @param buf -
 * @param start -
 * @param end -
 */
export const randomBytes = hasCrypto()
    ? (buf: Uint8Array, start = 0, end = buf.length) => (
          window.crypto.getRandomValues(buf.subarray(start, end)), buf
      )
    : (buf: Uint8Array, start?: number, end?: number) =>
          randomBytesFrom(SYSTEM, buf, start, end);
