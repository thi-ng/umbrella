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

/**
 * ITU-R BT.601 RGB luminance coeffs
 *
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/YCbCr#ITU-R_BT.601_conversion
 */
export const RGB_LUMINANCE_REC601 = [0.299, 0.587, 0.114];

/**
 * ITU-R BT.709 RGB luminance coeffs
 *
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/YCbCr#ITU-R_BT.709_conversion
 */
export const RGB_LUMINANCE_REC709 = [0.2126, 0.7152, 0.0722];

/**
 * ITU-R BT.2020 RGB luminance coeffs
 *
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/YCbCr#ITU-R_BT.2020_conversion
 */
export const RGB_LUMINANCE_REC2020 = [0.2627, 0.678, 0.0593];

/**
 * sRGB to XYZ D65 conversion matrix
 *
 * @remarks
 * Reference:
 * http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */
export const RGB_XYZ_D50 = [
    0.4360747,
    0.2225045,
    0.0139322,
    0.3850649,
    0.7168786,
    0.0971045,
    0.1430804,
    0.0606169,
    0.7141733,
];

/**
 * XYZ D50 to sRGB conversion matrix
 *
 * @remarks
 * Reference:
 * http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */
export const XYZ_RGB_D50 = [
    3.1338561,
    -0.9787684,
    0.0719453,
    -1.6168667,
    1.9161415,
    -0.2289914,
    -0.4906146,
    0.033454,
    1.4052427,
];

/**
 * sRGB to XYZ D65 conversion matrix
 *
 * @remarks
 * Reference:
 * http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */
export const RGB_XYZ_D65 = [
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
 * @remarks
 * Reference:
 * http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */
export const XYZ_RGB_D65 = [
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

/**
 * D50 -> D65 chromatic adaptation matrix. Inverse of {@link BRADFORD_D65_D50}.
 *
 * @remarks
 * Reference:
 * http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html
 */
export const BRADFORD_D50_D65 = [
    0.9555766,
    -0.0282895,
    0.0122982,
    -0.0230393,
    1.0099416,
    -0.020483,
    0.0631636,
    0.0210077,
    1.3299098,
];

/**
 * D65 -> D50 chromatic adaptation matrix. Inverse of {@link BRADFORD_D50_D65}.
 *
 * @remarks
 * Reference:
 * http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html
 */
export const BRADFORD_D65_D50 = [
    1.0478112,
    0.0295424,
    -0.0092345,
    0.0228866,
    0.9904844,
    0.0150436,
    -0.050127,
    -0.0170491,
    0.7521316,
];

/**
 * CIE Standard Illuminant D50
 */
export const D50 = [0.96422, 1, 0.82521];

/**
 * CIE Standard Illuminant D65
 *
 * Reference:
 * https://en.wikipedia.org/wiki/Illuminant_D65
 */
export const D65 = [0.95047, 1, 1.08883];

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

export let FF = float(3);
export let PC = percent(3);

/**
 * Sets precision for CSS formatted values to `x` significant digits (default:
 * 3).
 *
 * @param x
 */
export const setPrecision = (x: number) => {
    FF = float(x);
    PC = percent(x);
};

export const INV8BIT = 1 / 0xff;
