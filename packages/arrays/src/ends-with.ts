import { equiv as _eq } from "@thi.ng/equiv";

export const endsWith =
    <T>(buf: ArrayLike<T>, needle: ArrayLike<T>, equiv = _eq) => {
        let i = buf.length;
        let j = needle.length;
        if (i < j) return false;
        while (--i, --j >= 0 && equiv(buf[i], needle[j])) { }
        return j < 0;
    };
