import * as assert from "assert";
import { ISubscription, State } from "../src";

export const assertState = (x: ISubscription, state: State) =>
    assert.strictEqual(x.getState(), state, `${x.id} != ${State[state]}`);

export const assertIdle = (x: ISubscription) => assertState(x, State.IDLE);

export const assertActive = (x: ISubscription) => assertState(x, State.ACTIVE);

export const assertDone = (x: ISubscription) => assertState(x, State.DONE);

export const assertUnsub = (x: ISubscription) =>
    assertState(x, State.UNSUBSCRIBED);

export const assertError = (x: ISubscription) => assertState(x, State.ERROR);
