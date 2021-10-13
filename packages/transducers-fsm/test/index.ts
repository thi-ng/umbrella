import { group } from "@thi.ng/testament";
import { comp, iterator, map, range, takeNth } from "@thi.ng/transducers";
import * as assert from "assert";
import { fsm } from "../src/index.js"

group("transducers-fsm", {
    "readme example": () => {
        const testFSM = fsm<any, number, number>({
            states: {
                skip: (state, x) => {
                    if (x < 20) {
                        if (++state.count > 5) {
                            state.state = "take";
                            state.count = 1;
                            return [x];
                        }
                    } else {
                        state.state = "done";
                    }
                },
                take: (state, x) => {
                    if (x < 20) {
                        if (++state.count > 5) {
                            state.state = "skip";
                            state.count = 1;
                        } else {
                            return [x];
                        }
                    } else {
                        state.state = "done";
                    }
                },
                done: () => {},
            },
            terminate: "done",
            init: () => ({ state: "skip", count: 0 }),
        });
        assert.deepStrictEqual(
            [...iterator(testFSM, range(100))],
            [5, 6, 7, 8, 9, 15, 16, 17, 18, 19]
        );
        assert.deepStrictEqual(
            [...iterator(comp(takeNth(2), testFSM), range(100))],
            [10, 12, 14, 16, 18]
        );
        assert.deepStrictEqual(
            [
                ...iterator(
                    comp(
                        testFSM,
                        map((x: number) => x * 10)
                    ),
                    range(100)
                ),
            ],
            [50, 60, 70, 80, 90, 150, 160, 170, 180, 190]
        );
    },
});
