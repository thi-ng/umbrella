import { clamp01 } from "@thi.ng/math/interval";
import { setC3 } from "@thi.ng/vectors3/setc";
import { Color, ReadonlyColor } from "./api";
import { hueRgba } from "./hue-rgba";
import { ensureAlpha } from "./internal/ensure-alpha";

export const hslaRgba =
    (out: Color, src: ReadonlyColor) => {
        const s = clamp01(src[1]);
        const l = clamp01(src[2]);
        out = hueRgba(out || src, src[0], ensureAlpha(src[3]));
        const c = (1 - Math.abs(2 * l - 1)) * s;
        return setC3(
            out,
            (out[0] - 0.5) * c + l,
            (out[1] - 0.5) * c + l,
            (out[2] - 0.5) * c + l
        );
    };
