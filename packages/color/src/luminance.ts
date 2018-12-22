import { dot3 } from "@thi.ng/vectors3/dot";
import { INV8BIT, ReadonlyColor, RGB_LUMINANCE } from "./api";

export const luminanceRGB =
    (rgb: ReadonlyColor, weights = RGB_LUMINANCE) =>
        dot3(rgb, weights);

export const luminanceInt =
    (rgb: number) => {
        const r = (rgb >>> 16) & 0xff;
        const g = (rgb >>> 8) & 0xff;
        const b = rgb & 0xff;
        return ((r * 76 + g * 150 + b * 29) >>> 3) * INV8BIT;
    };
