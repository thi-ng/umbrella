import type { Pair } from "@thi.ng/api";
import { isMap } from "@thi.ng/checks/is-map";
import { isSet } from "@thi.ng/checks/is-set";

export const ensureMap = <K, V>(x: Iterable<Pair<K, V>>) =>
    isMap(x) ? <Map<K, V>>x : new Map<K, V>(x);

export const ensureSet = <T>(x: Iterable<T>) =>
    isSet(x) ? <Set<T>>x : new Set<T>(x);
