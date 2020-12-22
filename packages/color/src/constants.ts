import { float, percent } from "@thi.ng/strings";

// RGBA constants

export const BLACK = Object.freeze([0, 0, 0, 1]);
export const WHITE = Object.freeze([1, 1, 1, 1]);

export const RED = Object.freeze([1, 0, 0, 1]);
export const GREEN = Object.freeze([0, 1, 0, 1]);
export const BLUE = Object.freeze([0, 0, 1, 1]);

export const CYAN = Object.freeze([0, 1, 1, 1]);
export const MAGENTA = Object.freeze([1, 0, 1, 1]);
export const YELLOW = Object.freeze([1, 1, 0, 1]);

export const RGB_LUMINANCE = [0.299, 0.587, 0.114];

// Hue names

export enum Hue {
    RED,
    ORANGE,
    YELLOW,
    CHARTREUSE,
    GREEN,
    SPRING_GREEN,
    CYAN,
    AZURE,
    BLUE,
    VIOLET,
    MAGENTA,
    ROSE,
}

// internal helpers

export const SRGB_ALPHA = 0.055;

export const RGB_XYZ = [
    0.4124564,
    0.3575761,
    0.1804375,
    0.2126729,
    0.7151522,
    0.072175,
    0.0193339,
    0.119192,
    0.9503041,
];

export const XYZ_RGB = [
    3.2404542,
    -1.5371385,
    -0.4985314,
    -0.969266,
    1.8760108,
    0.041556,
    0.0556434,
    -0.2040259,
    1.0572252,
];

export const FF = float(2);
export const PC = percent(2);
export const INV8BIT = 1 / 0xff;
