import { group } from "@thi.ng/geom";
import { FillFn } from "./api";

export const compFill = (a: FillFn, b: FillFn): FillFn => (poly) =>
    group({}, [a(poly), b(poly)]);
