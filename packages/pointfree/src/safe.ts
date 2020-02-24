import { Fn2, NO_OP } from "@thi.ng/api";
import { illegalState } from "@thi.ng/errors";
import type { Stack } from "./api";

// ensure stack size
export let $: Fn2<Stack, number, void>;
export let $n: Fn2<number, number, void>;

export const safeMode = (state: boolean) => {
    if (state) {
        $n = (m: number, n: number) => m < n && illegalState(`stack underflow`);
        $ = (stack: Stack, n: number) => $n(stack.length, n);
    } else {
        $ = $n = NO_OP;
    }
};

safeMode(true);
