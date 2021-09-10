import { DEFAULT } from "@thi.ng/defmulti/constants";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, Tessellator } from "@thi.ng/geom-api";
import { tessellate as _tessellate } from "@thi.ng/geom-tessellate/tessellate";
import type { Vec } from "@thi.ng/vectors";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";

export const tessellate = defmulti<IShape, Tessellator[], Vec[][]>(dispatch);

tessellate.add(DEFAULT, ($, fns) => _tessellate(vertices($), fns));
