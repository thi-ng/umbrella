import { fract } from "@thi.ng/math";
import type { Hue } from "../api";

/**
 * Returns the {@link Hue} constant of the closest of 12 defined hues.
 *
 * @param h - normalized hue
 */
export const closestHue = (h: number): Hue => Math.round(fract(h) * 12) % 12;

/**
 * Returns the {@link Hue} constant of the closest primary or secondary hue.
 *
 * @param h - normalized hue
 */
export const closestPrimaryHue = (h: number): Hue => closestHue(h) & 0xe;
