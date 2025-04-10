// SPDX-License-Identifier: Apache-2.0
import type { VecOpRoVV } from "@thi.ng/vec-api";

export const equals3: VecOpRoVV<boolean> = (a, b) =>
	a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
