import { Fn2, IObjectOf } from "@thi.ng/api";
import { illegalArgs, illegalState } from "@thi.ng/errors";
import {
    ensureReduced,
    isReduced,
    iterator,
    Reducer,
    Transducer,
    unreduced
} from "@thi.ng/transducers";
import { Match, Matcher } from "./api";

/**
 * Finite-state machine transducer / iterator with support for single
 * lookahead value. Takes an object of `states` and their matchers, an
 * arbitrary context object and an `initial` state ID.
 *
 * The returned transducer consumes inputs of type `T` and produces
 * results of type `R`. The results are produced by callbacks of the
 * given state matchers. Each can produce any number of values. If a
 * callback returns a result wrapped w/ `reduced()`, the FSM causes
 * early termination of the overall transducer pipeline. Failed state
 * callbacks too can produce outputs, but will afterwards terminate the
 * FSM.
 *
 * An `IllegalStateError` will be thrown if a transition to an undefined
 * state ID occurs.
 *
 * The optional `update` function will be invoked for each input prior
 * to executing the currently active state matcher. It is intended to
 * update the context object (e.g. to update input location info for
 * generating error messages).
 *
 * If the optional `src` iterable is given, the function returns a
 * transforming iterator of the FSM results.
 *
 * @param states
 * @param ctx
 * @param initialState
 * @param update
 * @param src
 */
export function fsm<T, C, R>(
    states: IObjectOf<Matcher<T, C, R>>,
    ctx: C,
    initial: string | number,
    update?: Fn2<C, T, void>
): Transducer<T, R>;
export function fsm<T, C, R>(
    states: IObjectOf<Matcher<T, C, R>>,
    ctx: C,
    initial: string | number,
    update?: Fn2<C, T, void>,
    src?: Iterable<T>
): IterableIterator<R>;
export function fsm<T, C, R>(
    states: IObjectOf<Matcher<T, C, R>>,
    ctx: C,
    initial: string | number = "start",
    update?: Fn2<C, T, void>,
    src?: Iterable<T>
) {
    return src
        ? iterator(fsm(states, ctx, initial, update), src)
        : ([init, complete, reduce]: Reducer<any, R>) => {
              let currID = initial;
              let curr = states[initial]
                  ? states[initial]()
                  : illegalArgs(`invalid initial state: ${initial}`);
              return <Reducer<any, T>>[
                  init,
                  complete,
                  (acc, x) => {
                      update && update(ctx, x);
                      while (true) {
                          const { type, body } = curr(ctx, x);
                          const res = body && body[1];
                          if (type >= Match.FULL) {
                              const next = body && states[body[0]];
                              if (next) {
                                  currID = body![0];
                                  curr = next();
                              } else {
                                  illegalState(
                                      `unknown tx: ${currID} -> ${body &&
                                          body[0]}`
                                  );
                              }
                              if (res) {
                                  for (let y of unreduced(res)) {
                                      acc = reduce(acc, y);
                                      if (isReduced(acc)) {
                                          break;
                                      }
                                  }
                                  isReduced(res) && (acc = ensureReduced(acc));
                              }
                              if (type === Match.FULL_NC && !isReduced(acc)) {
                                  continue;
                              }
                          } else if (type === Match.FAIL) {
                              if (res) {
                                  for (let y of unreduced(res)) {
                                      acc = reduce(acc, y);
                                      if (isReduced(acc)) {
                                          break;
                                      }
                                  }
                              }
                              return ensureReduced(acc);
                          }
                          break;
                      }
                      return acc;
                  }
              ];
          };
}
