import { Comparator } from "@thi.ng/api/api";
import { compare } from "@thi.ng/api/compare";

import { Transducer } from "../api";
import { comp } from "../func/comp";
import { identity } from "../func/identity";
import { mapcat } from "./mapcat";
import { partition } from "./partition";

export function partitionSort<A, B>(n: number, key: ((x: A) => B) = <any>identity, cmp: Comparator<B> = compare): Transducer<A, A> {
    return comp(
        partition(n, true),
        mapcat((chunk: A[]) => chunk.sort((a, b) => cmp(key(a), key(b))))
    );
}
