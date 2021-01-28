import { DEFAULT, defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { eqDelta } from "@thi.ng/math";
import type { ColorType, ReadonlyColor } from "../api";
import { rgb } from "../rgb/rgb";

const EPS = 1 / 256;

export const isGrayHsv = (x: ReadonlyColor, eps = EPS) => x[1] <= eps;

export const isGrayRGB = (x: ReadonlyColor, eps = EPS) =>
    eqDelta(x[0], x[1], eps) && eqDelta(x[0], x[2], eps);

const isGray: MultiFn1O<ColorType<any>, number, boolean> = defmulti(
    (x) => x.mode
);

isGray.addAll({
    hsv: isGrayHsv,
    rgb: isGrayRGB,
});

isGray.isa("hsl", "hsv");
isGray.isa("hsl", "hsv");

isGray.add(DEFAULT, (x: any) => isGrayRGB(rgb(x)));
