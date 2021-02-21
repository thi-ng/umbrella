import { Lane } from "../api";
import { defFloatFormat } from "./float-format";

export const FLOAT_GRAY_ALPHA = defFloatFormat({
    gray: true,
    alpha: true,
    channels: [Lane.RED, Lane.ALPHA],
});
