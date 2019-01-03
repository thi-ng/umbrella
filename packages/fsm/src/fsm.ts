import { IObjectOf } from "@thi.ng/api";
import { illegalState } from "@thi.ng/errors/illegal-state";
import { reduced } from "@thi.ng/transducers/reduced";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
import { Match, Matcher } from "./api";

export const fsm = <T, C, R>(
    states: IObjectOf<Matcher<T, C, R>>,
    ctx: C,
    init: string | number = "start"
) => {
    let currID = init;
    let curr = states[init]();
    return mapcat<T, R>((x) => {
        const { type, body } = curr(ctx, x);
        if (type === Match.FULL) {
            const next = states[body[0]];
            if (next) {
                currID = body[0];
                curr = next();
            } else {
                illegalState(`unknown tx: ${currID} -> ${body && body[0]}`);
            }
            return body[1];
        } else if (type === Match.FAIL) {
            return reduced([]);
        }
    });
};
