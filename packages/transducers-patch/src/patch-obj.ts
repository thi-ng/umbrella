import { illegalArgs } from "@thi.ng/errors";
import { deleteIn, setIn, updateIn } from "@thi.ng/paths";
import { reducer, Reducer } from "@thi.ng/transducers";
import { reduce } from "@thi.ng/transducers";
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
    return patches
        ? reduce(patchObj(), init, patches)
        : reducer<any, PatchObjOp>(
              () => <any>{},
              (acc, x) => {
                  switch (x[0]) {
                      case Patch.SET:
                          acc = setIn(acc, x[1], x[2]);
                          break;
                      case Patch.UPDATE:
                          acc = updateIn(acc, x[1], x[2], ...x.slice(3));
                          break;
                      case Patch.DELETE:
                          acc = deleteIn(acc, x[1]);
                          break;
                      default:
                          illegalArgs(`patch op: ${x}`);
                  }
                  return acc;
              }
          );
}
