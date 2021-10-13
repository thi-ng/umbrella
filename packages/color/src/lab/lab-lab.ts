import type { ColorOp } from "../api.js";
import { xyzLab, xyzLabD65 } from "../xyz/xyz-lab.js";
import { xyzXyzD50_65, xyzXyzD65_50 } from "../xyz/xyz-xyz.js";
import { labXyz, labXyzD65 } from "./lab-xyz.js";

export const labLabD50_65: ColorOp = (out, src) =>
    xyzLabD65(out, xyzXyzD50_65(out, labXyz(out, src)));

export const labLabD65_50: ColorOp = (out, src) =>
    xyzLab(out, xyzXyzD65_50(out, labXyzD65(out, src)));
