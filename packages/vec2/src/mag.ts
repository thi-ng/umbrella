// SPDX-License-Identifier: Apache-2.0
import type { VecOpRoV } from "@thi.ng/vec-api";
import { magSq2 } from "./magsq.js";

export const mag2: VecOpRoV<number> = (v) => Math.sqrt(magSq2(v));
