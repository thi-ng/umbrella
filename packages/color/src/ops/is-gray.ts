import { DEFAULT } from "@thi.ng/defmulti/constants";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { eqDelta } from "@thi.ng/math/eqdelta";
import type { ReadonlyColor, TypedColor } from "../api";
import { EPS } from "../api/constants";
import { rgb } from "../rgb/rgb";

const isGrayHsv = (x: ReadonlyColor, eps = EPS) => x[1] <= eps;

const isGrayRgb = (x: ReadonlyColor, eps = EPS) =>
    eqDelta(x[0], x[1], eps) && eqDelta(x[0], x[2], eps);

const isGrayLab = (x: ReadonlyColor, eps = EPS) =>
    eqDelta(x[1], 0, eps) && eqDelta(x[2], 0, eps);

export const isGray = defmulti<TypedColor<any>, number | undefined, boolean>(
    (x) => x.mode
);

isGray.addAll({
    hcy: isGrayHsv,
    hsi: isGrayHsv,
    hsl: isGrayHsv,
    hsv: isGrayHsv,
    labD50: isGrayLab,
    labD65: isGrayLab,
    lch: isGrayHsv,
    rgb: isGrayRgb,
    srgb: isGrayRgb,
    ycc: isGrayLab,
});

isGray.add(DEFAULT, (x: any) => isGrayRgb(rgb(x)));
