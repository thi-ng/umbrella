import { Lane } from "../api";
import { defFloatFormat } from "./float-format";

export const FLOAT_GRAY = defFloatFormat({
    gray: true,
    channels: [Lane.RED],
});
