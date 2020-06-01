import { isIterable } from "@thi.ng/checks";
import { compR } from "../func/compr";
import { iterator } from "../iterator";
import { isReduced } from "../reduced";
import type { Fn0 } from "@thi.ng/api";
import type { Reducer, Transducer } from "../api";

export function interleave<A, B>(sep: B | Fn0<B>): Transducer<A, A | B>;
export function interleave<A, B>(
    sep: B | Fn0<B>,
    src: Iterable<A>
): IterableIterator<A | B>;
export function interleave<A, B>(sep: any, src?: Iterable<A>): any {
    return isIterable(src)
        ? iterator(interleave(sep), src)
        : (rfn: Reducer<any, A | B>) => {
              const r = rfn[2];
              const _sep: Fn0<B> = typeof sep === "function" ? sep : () => sep;
              return compR(rfn, (acc, x: A) => {
                  acc = r(acc, _sep());
                  return isReduced(acc) ? acc : r(acc, x);
              });
          };
}
