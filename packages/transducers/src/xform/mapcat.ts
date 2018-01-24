import { Transducer } from "../api";
import { comp } from "../func/comp";
import { cat } from "./cat";
import { map } from "./map";

export function mapcat<A, B>(fn: (x: A) => Iterable<B>): Transducer<A, B> {
    return comp(map(fn), cat());
}
