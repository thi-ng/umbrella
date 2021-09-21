import type { StatefulPredicate } from "@thi.ng/api";
import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Reducer, Transducer } from "./api";
import { compR } from "./compr";
import { iterator1 } from "./iterator";

/**
 * Similar to {@link (filter:1)}, but works with possibly stateful
 * predicates to achieve rate limiting capabilities. Emits only values
 * when predicate returns a truthy value.
 *
 * @remarks
 * To support multiple instances of stateful predicates, the predicate
 * itself must be wrapped in a no-arg function, which is called when the
 * transducer initializes. Any stateful initialization of the predicate
 * MUST be done in this function and the function MUST return a 1-arg
 * function, the actual predicate applied to each value.
 *
 * Also see: {@link (throttleTime:1)}.
 *
 * @param pred -
 * @param src -
 */
export function throttle<T>(pred: StatefulPredicate<T>): Transducer<T, T>;
export function throttle<T>(
    pred: StatefulPredicate<T>,
    src: Iterable<T>
): IterableIterator<T>;
export function throttle<T>(
    pred: StatefulPredicate<T>,
    src?: Iterable<T>
): any {
    return isIterable(src)
        ? iterator1(throttle(pred), src)
        : (rfn: Reducer<any, T>) => {
              const r = rfn[2];
              const _pred = pred();
              return compR(rfn, (acc, x: T) => (_pred(x) ? r(acc, x) : acc));
          };
}
