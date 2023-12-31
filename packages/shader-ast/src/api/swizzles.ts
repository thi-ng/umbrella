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

export type Swizzle2_1 = SwizzleXY_1 | SwizzleRG_1 | SwizzleST_1;
export type Swizzle2_2 = SwizzleXY_2 | SwizzleRG_2 | SwizzleST_2;
export type Swizzle2_3 = SwizzleXY_3 | SwizzleRG_3 | SwizzleST_3;
export type Swizzle2_4 = SwizzleXY_4 | SwizzleRG_4 | SwizzleST_4;

export type Swizzle3_1 = SwizzleXYZ_1 | SwizzleRGB_1 | SwizzleSTP_1;
export type Swizzle3_2 = SwizzleXYZ_2 | SwizzleRGB_2 | SwizzleSTP_2;
export type Swizzle3_3 = SwizzleXYZ_3 | SwizzleRGB_3 | SwizzleSTP_3;
export type Swizzle3_4 = SwizzleXYZ_4 | SwizzleRGB_4 | SwizzleSTP_4;

export type Swizzle4_1 = SwizzleXYZW_1 | SwizzleRGBA_1 | SwizzleSTPQ_1;
export type Swizzle4_2 = SwizzleXYZW_2 | SwizzleRGBA_2 | SwizzleSTPQ_2;
export type Swizzle4_3 = SwizzleXYZW_3 | SwizzleRGBA_3 | SwizzleSTPQ_3;
export type Swizzle4_4 = SwizzleXYZW_4 | SwizzleRGBA_4 | SwizzleSTPQ_4;

export type Swizzle2 = Swizzle2_1 | Swizzle2_2 | Swizzle2_3 | Swizzle2_4;
export type Swizzle3 = Swizzle3_1 | Swizzle3_2 | Swizzle3_3 | Swizzle3_4;
export type Swizzle4 = Swizzle4_1 | Swizzle4_2 | Swizzle4_3 | Swizzle4_4;
