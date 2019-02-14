import { Hue } from "./api";
import { ensureHue } from "./internal/ensure-hue";

/**
 * Returns the `Hue` constant of the closest of 12 defined hues.
 *
 * @param h hue
 */
export const closestHue =
    (h: number): Hue =>
        Math.round(ensureHue(h) * 12) % 12;

/**
 * Returns the `Hue` constant of the closest primary or secondary hue.
 *
 * @param h
 */
export const closestPrimaryHue =
    (h: number): Hue =>
        (Math.round(ensureHue(h) * 12) % 12) & 0xe;
