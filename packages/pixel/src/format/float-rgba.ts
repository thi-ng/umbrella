import { Lane } from "../api.js";
import { defFloatFormat } from "./float-format.js";

export const FLOAT_RGBA = defFloatFormat({
    alpha: true,
    channels: [Lane.RED, Lane.GREEN, Lane.BLUE, Lane.ALPHA],
});
