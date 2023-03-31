import type { DitherMode, ImageParam } from "../api";
import { DB } from "../state";

/**
 * State handler to update a single (numeric) image param in the central
 * {@link DB} atom.
 *
 * @param key
 * @param val
 */
export const setImageParam = (
	key: Exclude<ImageParam, "buf" | "dither">,
	val: string
) => DB.resetIn(["img", key], parseFloat(val));

/**
 * State handler to update the image dithering mode in the central {@link DB}
 * atom. Also see {@link DITHER_MODES}.
 *
 * @param mode
 */
export const setImageDither = (mode: DitherMode) =>
	DB.resetIn(["img", "dither"], mode);
