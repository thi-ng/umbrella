import { unsupported } from "@thi.ng/errors/unsupported";
import type { IShape } from "@thi.ng/geom-api";
import { Arc } from "../api/arc.js";

export const __ensureNoArc = (x: IShape) =>
	x instanceof Arc &&
	unsupported("path must not contain arcs, use normalizedPath() first");
