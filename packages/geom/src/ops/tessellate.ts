import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { IShape, Tessellator } from "@thi.ng/geom-api";
import { tessellate as _tessellate } from "@thi.ng/geom-tessellate";
import { Vec } from "@thi.ng/vectors";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";

export const tessellate = defmulti<IShape, Tessellator[], Vec[][]>(dispatch);

tessellate.add(DEFAULT, ($, fns) => _tessellate(vertices($), fns));
