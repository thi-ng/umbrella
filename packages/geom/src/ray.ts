// SPDX-License-Identifier: Apache-2.0
import type { Attribs } from "./api.js";
import type { Vec } from "@thi.ng/vectors";
import { normalize2 } from "@thi.ng/vectors/normalize";
import { Ray } from "./api/ray.js";

export const ray = (pos: Vec, dir: Vec, attribs?: Attribs, normalize = true) =>
	new Ray(pos, normalize ? normalize2(null, dir) : dir, attribs);
