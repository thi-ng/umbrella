import type { Fn } from "@thi.ng/api";
import type { IntChannel } from "../api.js";
import { __luminanceABGR } from "./utils.js";

const compileLShift = (x: string, shift: number) =>
	shift > 0
		? `(${x} << ${shift})`
		: shift < 0
		? `(${x} >>> ${-shift})`
		: `${x}`;

const compileRShift = (x: string, shift: number) => compileLShift(x, -shift);

const hex = (x: number) => `0x${x.toString(16)}`;

/** @internal */
export const __compileGrayFromABGR = (size: number) => {
	const shift = 8 - size;
	const mask = (1 << size) - 1;
	return <Fn<number, number>>(
		new Function(
			"luma",
			`return (x) => ${compileRShift("luma(x)", shift)} & ${mask};`
		)(__luminanceABGR)
	);
};

/** @internal */
export const __compileGrayToABGR = (size: number) => {
	let body: string;
	if (size !== 8) {
		const mask = (1 << size) - 1;
		// rescale factor
		const scale = 0xff / mask;
		body = `(((x & ${mask}) * ${scale}) | 0)`;
	} else {
		body = "x";
	}
	return <Fn<number, number>>(
		new Function("x", `return 0xff000000 | (${body} * 0x010101);`)
	);
};

/** @internal */
export const __compileFromABGR = (chans: IntChannel[]) =>
	<Fn<number, number>>new Function(
		"x",
		"return (" +
			chans
				.map((ch) => {
					const shift = ch.abgrShift + (8 - ch.size);
					return `(${compileRShift("x", shift)} & ${hex(ch.maskA)})`;
				})
				.join(" | ") +
			") >>> 0;"
	);

/** @internal */
export const __compileToABGR = (chans: IntChannel[], hasAlpha: boolean) => {
	const body = chans
		.map((ch) => {
			if (ch.size !== 8) {
				const mask = ch.mask0;
				// rescale factor
				const scale = 0xff / mask;
				const inner = compileRShift("x", ch.shift);
				return compileLShift(
					`((${inner} & ${mask}) * ${scale})`,
					24 - ch.lane * 8
				);
			} else {
				return compileLShift(`(x & ${hex(ch.maskA)})`, ch.abgrShift);
			}
		})
		.join(" | ");
	const alpha = !hasAlpha ? `0xff000000 | ` : "";
	return <Fn<number, number>>(
		new Function("x", `return (${alpha}${body}) >>> 0;`)
	);
};
