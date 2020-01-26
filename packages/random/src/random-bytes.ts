import { hasCrypto } from "@thi.ng/checks";
import { SYSTEM } from "./system";

/**
 * Fills given byte array with random values. Wrapper for
 * `crypto.getRandomValues()` with automatic fallback to using
 * `Math.random` if platform doesn't provide global crypto instance.
 */
export const randomBytes = hasCrypto()
    ? (buf: Uint8Array) => window.crypto.getRandomValues(buf)
    : (buf: Uint8Array) => {
          const n = buf.length;
          for (let i = 0; i < n; i++) {
              buf[i] = SYSTEM.int() & 0xff;
          }
          return buf;
      };
