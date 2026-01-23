// SPDX-License-Identifier: Apache-2.0
import { unsupportedOp } from "@thi.ng/errors/unsupported";
import type { IShape } from "../api.js";
import { Arc } from "../api/arc.js";

export const __ensureNoArc = (x: IShape) =>
	x instanceof Arc &&
	unsupportedOp("path must not contain arcs, use normalizedPath() first");
