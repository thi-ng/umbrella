import type { FnU } from "@thi.ng/api";

export type Stringer<T> = (x: T, ...xs: any[]) => string;

export type FnS = FnU<string>;
