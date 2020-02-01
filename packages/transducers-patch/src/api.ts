import { FnO } from "@thi.ng/api";

export const enum Patch {
    SET,
    INSERT,
    UPDATE,
    DELETE
}

export type PatchArrayOp<T> =
    | [Patch.SET, number, T]
    | [Patch.INSERT, number, T[]]
    | [Patch.UPDATE, number, FnO<T, T>, ...any[]]
    | [Patch.DELETE, number];

export type PatchObjOp =
    | [Patch.SET, string[], any]
    | [Patch.UPDATE, string[], FnO<any, any>, ...any[]]
    | [Patch.DELETE, string[]];
