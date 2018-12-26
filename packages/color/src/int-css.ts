import { U24 } from "@thi.ng/strings/radix";
import { INV8BIT, FF } from "./api";
import { IDeref } from "@thi.ng/api/api";

export const intCss =
    (argb: number | IDeref<number>) => {
        argb = typeof argb === "number" ? argb : argb.deref();
        const a = argb >>> 24;
        return (a < 255) ?
            `rgba(${(argb >> 16) & 0xff},${(argb >> 8) & 0xff},${argb & 0xff},${FF(a * INV8BIT)})` :
            `#${U24(argb & 0xffffff)}`;
    };
