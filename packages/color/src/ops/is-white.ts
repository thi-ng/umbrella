import { DEFAULT, defmulti, MultiFn1O } from "@thi.ng/defmulti";
import type { TypedColor, ReadonlyColor } from "../api";
import { rgb } from "../rgb/rgb";

const EPS = 1 / 256;

export const isWhiteHsv = (x: ReadonlyColor, eps = EPS) =>
    x[1] <= eps && x[2] >= 1 - eps;

export const isWhiteRGB = (x: ReadonlyColor, eps = EPS) => {
    eps = 1 - eps;
    return x[0] >= eps && x[1] >= eps && x[2] >= eps;
};

const isWhite: MultiFn1O<TypedColor<any>, number, boolean> = defmulti(
    (x) => x.mode
);

isWhite.addAll({
    hsv: isWhiteHsv,
    rgb: isWhiteRGB,
});

isWhite.add(DEFAULT, (x: any) => isWhiteRGB(rgb(x)));
