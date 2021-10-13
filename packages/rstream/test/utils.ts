import * as assert from "assert";
import { ISubscription, State } from "../src/index.js"

export const assertState = (x: ISubscription<any, any>, state: State) =>
    assert.strictEqual(x.getState(), state, `${x.id} != ${State[state]}`);

export const assertIdle = (x: ISubscription<any, any>) =>
    assertState(x, State.IDLE);

export const assertActive = (x: ISubscription<any, any>) =>
    assertState(x, State.ACTIVE);

export const assertDone = (x: ISubscription<any, any>) =>
    assertState(x, State.DONE);

export const assertUnsub = (x: ISubscription<any, any>) =>
    assertState(x, State.UNSUBSCRIBED);

export const assertError = (x: ISubscription<any, any>) =>
    assertState(x, State.ERROR);
