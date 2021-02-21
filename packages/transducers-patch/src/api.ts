import type { FnO, Path } from "@thi.ng/api";

export type Patch = "set" | "insert" | "update" | "delete";

export type PatchArrayOp<T> =
    | ["set", number, T]
    | ["insert", number, T[]]
    | ["update", number, FnO<T, T>, ...any[]]
    | ["delete", number];

export type PatchObjOp =
    | ["set", Path, any]
    | ["update", Path, FnO<any, any>, ...any[]]
    | ["delete", Path];
