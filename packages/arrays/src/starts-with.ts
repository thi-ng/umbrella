import { equiv as _eq } from "@thi.ng/equiv";

export const startsWith =
    (buf: ArrayLike<any>, needle: ArrayLike<any>, equiv = _eq) => {
        let i = buf.length;
        let j = needle.length;
        if (i < j) return false;
        while (-j >= 0 && equiv(buf[j], needle[j])) { }
        return j < 0;
    };
