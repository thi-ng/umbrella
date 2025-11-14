// SPDX-License-Identifier: Apache-2.0
// thing:no-export
import { isNumber } from "@thi.ng/checks/is-number";
import type { ScalarOrField } from "../api.js";

export const __ensureFn = (x: ScalarOrField) => (isNumber(x) ? () => x : x);
