import { randomBytes } from "./random-bytes";

/**
 * Uses {@link randomBytes} to fill given (optional) byte array with a UUIDv4.
 * Creates new Uint8Array if none given.
 *
 * @param buf -
 */
export const uuidv4Bytes = (buf?: Uint8Array) => {
    buf = randomBytes(buf || new Uint8Array(16));
    buf[6] = 0x40 | (buf[6] & 0x0f);
    buf[8] = 0x80 | (buf[8] & 0x3f);
    return buf;
};
