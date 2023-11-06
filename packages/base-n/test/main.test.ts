import { expect, test } from "bun:test";
import {
	BASE16_LC,
	BASE16_UC,
	BASE32_HEX,
	BASE32_RFC4648,
	BASE36,
	BASE58,
	BASE62,
	BASE64,
	BASE8,
	BASE85,
	defBase,
	type IBase,
} from "../src/index.js";

test("roundtrip", () => {
	const X = (BigInt(1) << BigInt(128)) - BigInt(1);

	const check = (
		base: IBase,
		expected: string,
		id: string | number = base.N
	) => {
		expect(base.encodeBigInt(X)).toBe(expected);
		expect(base.decodeBigInt(expected)).toBe(X);
	};

	check(BASE8, "3777777777777777777777777777777777777777777");
	check(BASE16_LC, "ffffffffffffffffffffffffffffffff");
	check(BASE16_UC, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
	check(BASE32_RFC4648, "H7777777777777777777777777", "32rfc");
	check(BASE32_HEX, "7VVVVVVVVVVVVVVVVVVVVVVVVV", "32hex");
	check(BASE36, "F5LXX1ZZ5PNORYNQGLHZMSP33");
	check(BASE58, "YcVfxkQb6JRzqk5kF2tNLv");
	check(BASE62, "7n42DGM5Tflk9n8mt7Fhc7");
	check(BASE64, "3/////////////////////");
	check(BASE85, "=r54lj&NUUO~Hi%c2ym0");
});

test("padding", () => {
	const B4 = defBase("abcd");
	expect(B4.encode(0)).toBe("a");
	expect(B4.encode(0, 6)).toBe("aaaaaa");
	expect(B4.encode(123)).toBe("bdcd");
	expect(B4.encode(123, 6)).toBe("aabdcd");
	expect(B4.encode(12345, 6)).toBe("daaadcb");
});
