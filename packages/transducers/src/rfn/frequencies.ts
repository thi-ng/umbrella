import { Reducer } from "../api";
import { identity } from "../func/identity";
import { count } from "./count";
import { groupByMap } from "./group-by-map";

export function frequencies<A, B>(key: ((x: A) => B) = <any>identity): Reducer<Map<B, number>, A> {
    return groupByMap(key, count());
}
