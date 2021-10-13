import { Lane } from "../api.js";
import { defFloatFormat } from "./float-format.js";

export const FLOAT_GRAY_ALPHA = defFloatFormat({
    gray: true,
    alpha: true,
    channels: [Lane.RED, Lane.ALPHA],
});
