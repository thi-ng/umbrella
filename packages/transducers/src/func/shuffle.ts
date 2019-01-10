export const shuffleN =
    (buf: any[], n: number) => {
        const l = buf.length;
        n = n < l ? n : l;
        while (--n >= 0) {
            const a = (Math.random() * l) | 0;
            const b = (Math.random() * l) | 0;
            const t = buf[a];
            buf[a] = buf[b];
            buf[b] = t;
        }
    };
