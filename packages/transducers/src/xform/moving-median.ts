import { Comparator } from "@thi.ng/api/api";
import { compare } from "@thi.ng/compare";

import { Transducer } from "../api";
import { comp } from "../func/comp";
import { identity } from "../func/identity";
import { map } from "./map";
import { partition } from "./partition";

export function movingMedian<A, B>(n: number, key: ((x: A) => B) = <any>identity, cmp: Comparator<B> = compare): Transducer<A, A> {
    const m = n >> 1;
    return comp(partition(n, 1, true), map((window) => [...window].sort((a, b) => cmp(key(a), key(b)))[m]));
}
