// The types here are more smart alternative of
// api/swizzles.ts, however, not shipped for the user yet.
// They are used as internal testing purposes to see if something
// gets accidently missing in the enumeration.
import type * as api from "../src/api/swizzles.ts";
import { test } from "bun:test";

type SwizzleXY_1 = "x" | "y";
type SwizzleXY_2 = `${SwizzleXY_1}${SwizzleXY_1}`;
type SwizzleXY_3 = `${SwizzleXY_2}${SwizzleXY_1}`;
type SwizzleXY_4 = `${SwizzleXY_3}${SwizzleXY_1}`;
type SwizzleRG_1 = "r" | "g";
type SwizzleRG_2 = `${SwizzleRG_1}${SwizzleRG_1}`;
type SwizzleRG_3 = `${SwizzleRG_2}${SwizzleRG_1}`;
type SwizzleRG_4 = `${SwizzleRG_3}${SwizzleRG_1}`;
type SwizzleST_1 = "s" | "t";
type SwizzleST_2 = `${SwizzleST_1}${SwizzleST_1}`;
type SwizzleST_3 = `${SwizzleST_2}${SwizzleST_1}`;
type SwizzleST_4 = `${SwizzleST_3}${SwizzleST_1}`;

type SwizzleXYZ_1 = SwizzleXY_1 | "z";
type SwizzleXYZ_2 = `${SwizzleXYZ_1}${SwizzleXYZ_1}`;
type SwizzleXYZ_3 = `${SwizzleXYZ_2}${SwizzleXYZ_1}`;
type SwizzleXYZ_4 = `${SwizzleXYZ_3}${SwizzleXYZ_1}`;
type SwizzleRGB_1 = SwizzleRG_1 | "b";
type SwizzleRGB_2 = `${SwizzleRGB_1}${SwizzleRGB_1}`;
type SwizzleRGB_3 = `${SwizzleRGB_2}${SwizzleRGB_1}`;
type SwizzleRGB_4 = `${SwizzleRGB_3}${SwizzleRGB_1}`;
type SwizzleSTP_1 = SwizzleST_1 | "p";
type SwizzleSTP_2 = `${SwizzleSTP_1}${SwizzleSTP_1}`;
type SwizzleSTP_3 = `${SwizzleSTP_2}${SwizzleSTP_1}`;
type SwizzleSTP_4 = `${SwizzleSTP_3}${SwizzleSTP_1}`;

type SwizzleXYZW_1 = SwizzleXYZ_1 | "w";
type SwizzleXYZW_2 = `${SwizzleXYZW_1}${SwizzleXYZW_1}`;
type SwizzleXYZW_3 = `${SwizzleXYZW_2}${SwizzleXYZW_1}`;
type SwizzleXYZW_4 = `${SwizzleXYZW_3}${SwizzleXYZW_1}`;
type SwizzleRGBA_1 = SwizzleRGB_1 | "a";
type SwizzleRGBA_2 = `${SwizzleRGBA_1}${SwizzleRGBA_1}`;
type SwizzleRGBA_3 = `${SwizzleRGBA_2}${SwizzleRGBA_1}`;
type SwizzleRGBA_4 = `${SwizzleRGBA_3}${SwizzleRGBA_1}`;
type SwizzleSTPQ_1 = SwizzleSTP_1 | "q";
type SwizzleSTPQ_2 = `${SwizzleSTPQ_1}${SwizzleSTPQ_1}`;
type SwizzleSTPQ_3 = `${SwizzleSTPQ_2}${SwizzleSTPQ_1}`;
type SwizzleSTPQ_4 = `${SwizzleSTPQ_3}${SwizzleSTPQ_1}`;

type Swizzle2_1 = SwizzleXY_1 | SwizzleRG_1 | SwizzleST_1;
type Swizzle2_2 = SwizzleXY_2 | SwizzleRG_2 | SwizzleST_2;
type Swizzle2_3 = SwizzleXY_3 | SwizzleRG_3 | SwizzleST_3;
type Swizzle2_4 = SwizzleXY_4 | SwizzleRG_4 | SwizzleST_4;

type Swizzle3_1 = SwizzleXYZ_1 | SwizzleRGB_1 | SwizzleSTP_1;
type Swizzle3_2 = SwizzleXYZ_2 | SwizzleRGB_2 | SwizzleSTP_2;
type Swizzle3_3 = SwizzleXYZ_3 | SwizzleRGB_3 | SwizzleSTP_3;
type Swizzle3_4 = SwizzleXYZ_4 | SwizzleRGB_4 | SwizzleSTP_4;

type Swizzle4_1 = SwizzleXYZW_1 | SwizzleRGBA_1 | SwizzleSTPQ_1;
type Swizzle4_2 = SwizzleXYZW_2 | SwizzleRGBA_2 | SwizzleSTPQ_2;
type Swizzle4_3 = SwizzleXYZW_3 | SwizzleRGBA_3 | SwizzleSTPQ_3;
type Swizzle4_4 = SwizzleXYZW_4 | SwizzleRGBA_4 | SwizzleSTPQ_4;

type Swizzle2 = Swizzle2_1 | Swizzle2_2 | Swizzle2_3 | Swizzle2_4;
type Swizzle3 = Swizzle3_1 | Swizzle3_2 | Swizzle3_3 | Swizzle3_4;
type Swizzle4 = Swizzle4_1 | Swizzle4_2 | Swizzle4_3 | Swizzle4_4;

test("Test exhaustiveness of swizzle types", () => {
	(_: Swizzle2_1): api.Swizzle2_1 => _;
	(_: Swizzle2_2): api.Swizzle2_2 => _;
	(_: Swizzle2_3): api.Swizzle2_3 => _;
	(_: Swizzle2_4): api.Swizzle2_4 => _;
	(_: Swizzle3_1): api.Swizzle3_1 => _;
	(_: Swizzle3_2): api.Swizzle3_2 => _;
	(_: Swizzle3_3): api.Swizzle3_3 => _;
	(_: Swizzle3_4): api.Swizzle3_4 => _;
	(_: Swizzle4_1): api.Swizzle4_1 => _;
	(_: Swizzle4_2): api.Swizzle4_2 => _;
	(_: Swizzle4_3): api.Swizzle4_3 => _;
	(_: Swizzle4_4): api.Swizzle4_4 => _;
	(_: Swizzle2): api.Swizzle2 => _;
	(_: Swizzle3): api.Swizzle3 => _;
	(_: Swizzle4): api.Swizzle4 => _;
	// We flip the types and test exhaustiveness again
	// The existance of both function
	// (a: A) => B and (b: B) => A
	// guarantees that A and B are the same type
	(_: api.Swizzle2_1): Swizzle2_1 => _;
	(_: api.Swizzle2_2): Swizzle2_2 => _;
	(_: api.Swizzle2_3): Swizzle2_3 => _;
	(_: api.Swizzle2_4): Swizzle2_4 => _;
	(_: api.Swizzle3_1): Swizzle3_1 => _;
	(_: api.Swizzle3_2): Swizzle3_2 => _;
	(_: api.Swizzle3_3): Swizzle3_3 => _;
	(_: api.Swizzle3_4): Swizzle3_4 => _;
	(_: api.Swizzle4_1): Swizzle4_1 => _;
	(_: api.Swizzle4_2): Swizzle4_2 => _;
	(_: api.Swizzle4_3): Swizzle4_3 => _;
	(_: api.Swizzle4_4): Swizzle4_4 => _;
	(_: api.Swizzle2): Swizzle2 => _;
	(_: api.Swizzle3): Swizzle3 => _;
	(_: api.Swizzle4): Swizzle4 => _;
});
