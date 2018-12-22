import { U24 } from "@thi.ng/strings/radix";
import { INV8BIT, FF } from "./api";

export const intCss =
    (rgba: number) => {
        const a = rgba >>> 24;
        return (a < 255) ?
            `rgba(${(rgba >> 16) & 0xff},${(rgba >> 8) & 0xff},${rgba & 0xff},${FF(a * INV8BIT)})` :
            `#${U24(rgba)}`;
    };
