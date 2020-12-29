import type { Fn } from "@thi.ng/api";
import { sortByCachedKey } from "@thi.ng/arrays";
import { compareNumAsc, compareNumDesc } from "@thi.ng/compare";
import type { ReadonlyColor } from "./api";
import { distHSV, distRGB } from "./distance";

export const selectChannel = (id: number) => (col: ReadonlyColor) => col[id];

export const proximityHSV = (target: ReadonlyColor) => (col: ReadonlyColor) =>
    distHSV(target, col);

export const proximityRGB = (target: ReadonlyColor) => (col: ReadonlyColor) =>
    distRGB(target, col);

export const sortColors = (
    cols: ReadonlyColor[],
    key: Fn<ReadonlyColor, number>,
    isReverse = false
) => sortByCachedKey(cols, key, isReverse ? compareNumDesc : compareNumAsc);
