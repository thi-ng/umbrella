import { Lane } from "../api";
import { defFloatFormat } from "./float-format";

export const FLOAT_RGBA = defFloatFormat({
    alpha: true,
    channels: [Lane.RED, Lane.GREEN, Lane.BLUE, Lane.ALPHA],
});
