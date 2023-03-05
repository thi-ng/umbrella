import type { Comparator } from "@thi.ng/api";
import type { LCH } from "@thi.ng/color";
import { compareByKey, compareByKeys2, compareNumDesc } from "@thi.ng/compare";

export type SortMode = "hue" | "luma" | "area";

export interface DominantColor {
	col: LCH;
	area: number;
}

export const SORT_MODES: Record<SortMode, Comparator<DominantColor>> = {
	hue: compareByKeys2(
		(x) => x.col.h,
		(x) => x.col.l
	),
	luma: compareByKeys2(
		(x) => x.col.l,
		(x) => x.col.h
	),
	area: compareByKey("area", compareNumDesc),
};
