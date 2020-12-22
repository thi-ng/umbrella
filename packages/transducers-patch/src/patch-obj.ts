import { isString } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { deleteInUnsafe, setInUnsafe, updateInUnsafe } from "@thi.ng/paths";
import { reduce, reducer, Reducer } from "@thi.ng/transducers";
import type { PatchObjOp } from "./api";

/**
 * Reducer for {@link Patch} based immutable object updates.
 *
 * @remarks
 * Only the following patch types are supported:
 * - SET
 * - UPDATE
 * - DELETE
 */
export function patchObj(): Reducer<any, PatchObjOp>;
export function patchObj(init: any, patches: Iterable<PatchObjOp>): any;
export function patchObj(init?: any, patches?: Iterable<PatchObjOp>) {
    const edit = (acc: any, x: PatchObjOp) => {
        switch (x[0]) {
            case "set":
                return setInUnsafe(acc, x[1], x[2]);
            case "update":
                return updateInUnsafe(acc, x[1], x[2], ...x.slice(3));
            case "delete":
                return deleteInUnsafe(acc, x[1]);
            default:
                illegalArgs(`patch op: ${x}`);
        }
    };
    return patches
        ? reduce(patchObj(), init, patches)
        : reducer<any, PatchObjOp>(
              () => <any>{},
              (acc, x) => {
                  if (isString(x[0])) {
                      acc = edit(acc, x);
                  } else {
                      for (let e of <PatchObjOp[]>x) {
                          acc = edit(acc, e);
                      }
                  }
                  return acc;
              }
          );
}
