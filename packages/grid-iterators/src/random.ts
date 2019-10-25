import { shuffle } from "@thi.ng/arrays";
import { IRandom, SYSTEM } from "@thi.ng/random";
import { range } from "@thi.ng/transducers";

export function* random2d(cols: number, rows = cols, rnd: IRandom = SYSTEM) {
    for (let i of shuffle([...range(cols * rows)], undefined, rnd)) {
        yield [i % cols, (i / cols) | 0];
    }
}
