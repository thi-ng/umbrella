import type { IObjectOf } from "@thi.ng/api";
import type {
	ColorRangePreset,
	ColorThemePart,
	ReadonlyColor,
} from "@thi.ng/color";
import { COLOR_RANGES } from "@thi.ng/color/color-range";

export interface MainInputs {
	parts: IObjectOf<ColorThemePart>;
	num: number;
	variance: number;
	seed: number;
	sorted: boolean;
}

export interface MainOutputs extends MainInputs {
	colors: ReadonlyColor[];
}

// pre-sort range preset IDs for dropdown menus
export const RANGE_IDs = <ColorRangePreset[]>Object.keys(COLOR_RANGES).sort();

// number of serialized state tokens (from hash fragment)
export const NUM_STATE_TOKENS = 15;
