import { Color, ReadonlyColor } from "./api";
import { luminanceRGB } from "./luminance";
import { setC3 } from "@thi.ng/vectors3/setc";
import { clamp } from "./clamp";

export const rgbaYcbcra =
    (out: Color, src: ReadonlyColor) => {
        out = clamp(out || src, src);
        const y = luminanceRGB(src);
        return setC3(
            out,
            y,
            (src[2] - y) * 0.565,
            (src[0] - y) * 0.713
        );
    };
