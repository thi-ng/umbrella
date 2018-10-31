import { Vec } from "../api";

export function* iterator(buf: Vec, n: number, i = 0, s = 1) {
    for (; n > 0; n-- , i += s) {
        yield buf[i];
    }
}
