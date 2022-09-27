import type { Fn3, IGrid2D } from "@thi.ng/api";

export type Shader2D<T> = Fn3<IGrid2D<any, T>, number, number, T>;
