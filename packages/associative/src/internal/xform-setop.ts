import { reduce, Reducer } from "@thi.ng/transducers";
import { ensureSet } from "../utils";
import type { Fn0 } from "@thi.ng/api";

export const xformSetOp = <T>(
    rfn: Fn0<Reducer<Set<T>, Iterable<T>>>,
    op: (a: Set<T>, b: Set<T>, c?: Set<T>) => Set<T>,
    src?: Iterable<Iterable<T>>
) =>
    src
        ? reduce(rfn(), src)
        : <Reducer<Set<T>, Iterable<T>>>[
              () => <any>null,
              (acc) => acc || new Set<T>(),
              (acc, x) => (!acc ? ensureSet(x) : op(acc, ensureSet(x))),
          ];
