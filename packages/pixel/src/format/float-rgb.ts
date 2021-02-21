import { Lane } from "../api";
import { defFloatFormat } from "./float-format";

export const FLOAT_RGB = defFloatFormat({
    channels: [Lane.RED, Lane.GREEN, Lane.BLUE],
});
