import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { eqDelta } from "@thi.ng/math/eqdelta";
import type { ReadonlyColor, TypedColor } from "./api.js";
import { EPS } from "./api/constants.js";
import { __dispatch0 } from "./internal/dispatch.js";
import { rgb } from "./rgb/rgb.js";

const isGrayHsv = (x: ReadonlyColor, eps = EPS) => x[1] <= eps;

const isGrayRgb = (x: ReadonlyColor, eps = EPS) =>
    eqDelta(x[0], x[1], eps) && eqDelta(x[0], x[2], eps);

const isGrayLab = (x: ReadonlyColor, eps = EPS) =>
    eqDelta(x[1], 0, eps) && eqDelta(x[2], 0, eps);

export const isGray = defmulti<TypedColor<any>, number | undefined, boolean>(
    __dispatch0,
    {
        hcy: "hsv",
        hsi: "hsv",
        hsl: "hsv",
        lch: "hsv",
        labD65: "labD50",
        srgb: "rgb",
        ycc: "labD50",
    },
    {
        hsv: isGrayHsv,
        labD50: isGrayLab,
        rgb: isGrayRgb,
        [DEFAULT]: (x: any) => isGrayRgb(rgb(x)),
    }
);
