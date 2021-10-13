import { group } from "@thi.ng/geom/group";
import type { FillFn } from "./api.js";

export const compFill =
    (a: FillFn, b: FillFn): FillFn =>
    (poly) =>
        group({}, [a(poly), b(poly)]);
