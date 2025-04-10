// SPDX-License-Identifier: Apache-2.0
import type { VecOpRoVV } from "@thi.ng/vec-api";

export const cross2: VecOpRoVV<number> = (a, b) => a[0] * b[1] - a[1] * b[0];
