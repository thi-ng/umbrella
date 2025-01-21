// SPDX-License-Identifier: Apache-2.0
import type { Attribs } from "./api.js";
import type { Vec } from "@thi.ng/vectors";
import { Points } from "./api/points.js";

export const points = (pts?: Iterable<Vec>, attribs?: Attribs) =>
	new Points(pts, attribs);
