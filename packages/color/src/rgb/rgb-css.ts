// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyColor } from "../api.js";
import { rgbSrgb } from "./rgb-srgb.js";
import { srgbCss } from "../srgb/srgb-css.js";

export const rgbCss = (src: ReadonlyColor) => srgbCss(rgbSrgb([], src));
