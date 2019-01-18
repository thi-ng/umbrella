import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { Vec } from "@thi.ng/vectors3";
import { IShape, Tessellator } from "../api";
import { dispatch } from "../internal/dispatch";
import { tessellatePoints } from "../internal/tessellate";
import { vertices } from "./vertices";

export const tessellate = defmulti<IShape, Tessellator[], Vec[][]>(dispatch);

tessellate.add(DEFAULT, ($, fns) => tessellatePoints(vertices($), fns));
