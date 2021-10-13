import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, Tessellator } from "@thi.ng/geom-api";
import { tessellate as _tessellate } from "@thi.ng/geom-tessellate/tessellate";
import type { Vec } from "@thi.ng/vectors";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

export const tessellate = defmulti<IShape, Tessellator[], Vec[][]>(
    __dispatch,
    {},
    {
        [DEFAULT]: ($, fns) => _tessellate(vertices($), fns),
    }
);
