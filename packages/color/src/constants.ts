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

/**
 * sRGB to XYZ D65 conversion matrix
 *
 * @reference
 * http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */
export const RGB_XYZ = [
    0.4124564,
    0.2126729,
    0.0193339,
    0.3575761,
    0.7151522,
    0.119192,
    0.1804375,
    0.072175,
    0.9503041,
];

/**
 * XYZ D65 to sRGB conversion matrix
 *
 * @reference
 * http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */
export const XYZ_RGB = [
    3.2404542,
    -0.969266,
    0.0556434,
    -1.5371385,
    1.8760108,
    -0.2040259,
    -0.4985314,
    0.041556,
    1.0572252,
];

export const FF = float(3);
export const PC = percent(3);
export const INV8BIT = 1 / 0xff;

export const OKLAB_M1 = [
    0.8189330101,
    0.0329845436,
    0.0482003018,
    0.3618667424,
    0.9293118715,
    0.2643662691,
    -0.1288597137,
    0.0361456387,
    0.633851707,
];

export const OKLAB_M2 = [
    0.2104542553,
    1.9779984951,
    0.0259040371,
    0.793617785,
    -2.428592205,
    0.7827717662,
    -0.0040720468,
    0.4505937099,
    -0.808675766,
];
