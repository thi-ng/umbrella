import type { IDeref } from "@thi.ng/api";
import { U24 } from "@thi.ng/strings";
import { FF, INV8BIT } from "../api/constants";

export const int32Css = (src: number | IDeref<number>) => {
    src = typeof src === "number" ? src : src.deref();
    const a = src >>> 24;
    return a < 255
        ? `rgba(${(src >> 16) & 0xff},${(src >> 8) & 0xff},${src & 0xff},${FF(
              a * INV8BIT
          )})`
        : `#${U24(src & 0xffffff)}`;
};

export const int24Css = (src: number | IDeref<number>) => {
    src = typeof src === "number" ? src : src.deref();
    return int32Css(src | 0xff000000);
};
