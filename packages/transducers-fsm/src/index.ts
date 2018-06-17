import { IObjectOf } from "@thi.ng/api/api";

import { Reducer, Transducer } from "@thi.ng/transducers/api";
import { compR } from "@thi.ng/transducers/func/compr";
import { ensureReduced } from "@thi.ng/transducers/reduced";

export interface FSMState {
    state: PropertyKey;
}

export type FSMStateMap<T extends FSMState, A, B> = IObjectOf<FSMHandler<T, A, B>>;
export type FSMHandler<T extends FSMState, A, B> = (state: T, input: A) => B | void;

export interface FSMOpts<T extends FSMState, A, B> {
    states: FSMStateMap<T, A, B>;
    terminate: PropertyKey;
    init: () => T;
}

export function fsm<T extends FSMState, A, B>(opts: FSMOpts<T, A, B>): Transducer<A, B> {
    return (rfn: Reducer<any, B>) => {
        const states = opts.states;
        const state = opts.init();
        const r = rfn[2];
        return compR(rfn,
            (acc, x) => {
                // console.log(x, State[state.state], state);
                const res = states[<any>state.state](state, x);
                if (res) {
                    acc = r(acc, res);
                    if (state.state == opts.terminate) {
                        return ensureReduced(acc);
                    }
                }
                return acc;
            });
    }
}
