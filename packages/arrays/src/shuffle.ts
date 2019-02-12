import { IRandom, SYSTEM } from "@thi.ng/random";

export const shuffle =
    (buf: any[], n = buf.length, rnd: IRandom = SYSTEM) => {
        const l = buf.length;
        if (l > 1) {
            n = Math.min(n, l);
            while (--n >= 0) {
                const a = rnd.float(l) | 0;
                const b = rnd.float(l) | 0;
                const t = buf[a];
                buf[a] = buf[b];
                buf[b] = t;
            }
        }
        return buf;
    };
