import { DEFAULT, defmulti, MultiFn1O } from "@thi.ng/defmulti";
import type { ColorType, ReadonlyColor } from "../api";
import { rgb } from "../rgb/rgb";

const EPS = 1 / 256;

export const isBlackHsv = (x: ReadonlyColor, eps = EPS) => x[2] <= eps;

export const isBlackRGB = (x: ReadonlyColor, eps = EPS) =>
    x[0] <= eps && x[1] <= eps && x[2] <= eps;

const isBlack: MultiFn1O<ColorType<any>, number, boolean> = defmulti(
    (x) => x.mode
);

isBlack.addAll({
    hsv: isBlackHsv,
    rgb: isBlackRGB,
});

isBlack.add(DEFAULT, (x: any) => isBlackRGB(rgb(x)));
