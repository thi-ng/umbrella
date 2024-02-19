import { max, max2, max3, max4 } from "@thi.ng/vectors/max";
import { min, min2, min3, min4 } from "@thi.ng/vectors/min";
import { mixN, mixN2, mixN3, mixN4 } from "@thi.ng/vectors/mixn";
import { setN, setN2, setN3, setN4 } from "@thi.ng/vectors/setn";
import { vecOf } from "@thi.ng/vectors/vec-of";
import type { VecAPI } from "./api.js";

export const VEC = (size: number): VecAPI => ({
	min,
	max,
	mixN,
	vecOf: (n) => vecOf(size, n),
	setN,
});

export const VEC2: VecAPI = {
	min: min2,
	max: max2,
	mixN: mixN2,
	setN: setN2,
	vecOf: (x) => vecOf(2, x),
};

export const VEC3: VecAPI = {
	min: min3,
	max: max3,
	mixN: mixN3,
	setN: setN3,
	vecOf: (x) => vecOf(3, x),
};

export const VEC4: VecAPI = {
	min: min4,
	max: max4,
	mixN: mixN4,
	setN: setN4,
	vecOf: (x) => vecOf(4, x),
};
