import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { Tessellator, tessellate as _tessellate } from "@thi.ng/geom-tessellate";
import { Vec } from "@thi.ng/vectors";
import { IShape } from "../api";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";

export const tessellate = defmulti<IShape, Tessellator[], Vec[][]>(dispatch);

tessellate.add(DEFAULT, ($, fns) => _tessellate(vertices($), fns));
