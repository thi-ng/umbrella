import { illegalArgs } from "@thi.ng/errors";
import { deleteIn, setIn, updateIn } from "@thi.ng/paths";
import { reducer, Reducer } from "@thi.ng/transducers";
import { reduce } from "@thi.ng/transducers";
import { isNumber } from "util";
import { Patch, PatchObjOp } from "./api";

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
            case Patch.SET:
                return setIn(acc, x[1], x[2]);
            case Patch.UPDATE:
                return updateIn(acc, x[1], x[2], ...x.slice(3));
            case Patch.DELETE:
                return deleteIn(acc, x[1]);
            default:
                illegalArgs(`patch op: ${x}`);
        }
    };
    return patches
        ? reduce(patchObj(), init, patches)
        : reducer<any, PatchObjOp>(
              () => <any>{},
              (acc, x) => {
                  if (isNumber(x[0])) {
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
