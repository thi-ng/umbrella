import { eqDelta } from "@thi.ng/math";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
	ARCMIN,
	CM,
	convert,
	DEG,
	FT,
	GON,
	IN,
	KM,
	M,
	MI,
	MM,
	NM,
	RAD,
	TURN,
	Unit,
	YD,
} from "../src/index.js";

const PI = Math.PI;
const TAU = 2 * PI;

const check = (x: number, src: Unit, y: number, dest: Unit) => {
	const res = convert(x, src, dest);
	assert.ok(eqDelta(res, y), `${x} => ${res} (expected: ${y})`);
};

group("units", {
	angle: () => {
		check(1, RAD, 180 / PI, DEG);
		check(TAU, RAD, 1, TURN);
		check(360, DEG, 400, GON);
		check(1 / 60, DEG, 1, ARCMIN);
	},

	length: () => {
		check(1, M, 1000, MM);
		check(1000, MM, 1, M);
		check(1, M, 100, CM);
		check(1, KM, 1000, M);
		check(25.4e6, NM, 1, IN);
		check(25.4, MM, 1, IN);
		check(12, IN, 1, FT);
		check(36, IN, 1, YD);
		check(1760 * 36, IN, 1, MI);
	},
});
