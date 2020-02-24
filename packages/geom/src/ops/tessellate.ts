import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { tessellate as _tessellate } from "@thi.ng/geom-tessellate";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";
import type { IShape, Tessellator } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";

export const tessellate = defmulti<IShape, Tessellator[], Vec[][]>(dispatch);

tessellate.add(DEFAULT, ($, fns) => _tessellate(vertices($), fns));
