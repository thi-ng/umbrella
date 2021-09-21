import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { illegalArity } from "@thi.ng/errors/illegal-arity";
import type { Reducer } from "@thi.ng/transducers";
import { reduce, reducer } from "@thi.ng/transducers/reduce";
import type { PatchArrayOp } from "./api";

/**
 * Reducer for {@link Patch} based array edits. Only numeric indices are
 * supported (i.e. NO nested edits, use {@link patchObj} for that
 * purpose).
 *
 * @remarks
 * Unless `immutable` is false (default: true), all edits are performed
 * in a non-destructive manner.
 *
 * The following patch types are supported:
 * - SET
 * - UPDATE
 * - INSERT
 * - DELETE
 *
 * @example
 * ```ts
 * // direct invocation
 * patchArray(
 *     true,
 *     [1, 2, 3],
 *     [
 *         [Patch.SET, 0, 42],
 *         [Patch.UPDATE, 1, (x, n) => x * n, 10],
 *         [Patch.INSERT, 2, [10, 11]],
 *         [Patch.DELETE, 3]
 *     ]
 * );
 * // [ 42, 20, 10, 3 ]
 * ```
 */
export function patchArray<T>(
    immutable?: boolean
): Reducer<T[], PatchArrayOp<T> | PatchArrayOp<T>[]>;
export function patchArray<T>(
    immutable: boolean,
    init: T[],
    patches: Iterable<PatchArrayOp<T> | PatchArrayOp<T>[]>
): T[];
export function patchArray<T>(...args: any[]) {
    let immutable: boolean;
    let init: T[];
    let patches: Iterable<PatchArrayOp<T> | PatchArrayOp<T>[]> | undefined;
    switch (args.length) {
        case 0:
            immutable = true;
            break;
        case 1:
            immutable = args[0];
            break;
        case 3:
            immutable = args[0];
            init = args[1];
            patches = args[2];
            break;
        default:
            illegalArity(args.length);
    }

    const edit = (acc: T[], x: PatchArrayOp<T> | PatchArrayOp<T>[]) => {
        switch (x[0]) {
            case "set":
                acc[x[1]] = x[2];
                break;
            case "update":
                acc[x[1]] = x[2](acc[x[1]], ...x.slice(3));
                break;
            case "insert":
                acc.splice(x[1], 0, ...x[2]);
                break;
            case "delete":
                acc.splice(x[1], 1);
                break;
            default:
                illegalArgs(`patch op: ${x}`);
        }
        return acc;
    };

    return patches
        ? reduce(patchArray<T>(immutable), init!, patches)
        : reducer<T[], PatchArrayOp<T> | PatchArrayOp<T>[]>(
              () => [],
              (acc, x) => {
                  immutable && (acc = acc.slice());
                  if (isString(x[0])) {
                      acc = edit(acc, x);
                  } else {
                      for (let e of <PatchArrayOp<T>[]>x) {
                          acc = edit(acc, e);
                      }
                  }
                  return acc;
              }
          );
}
