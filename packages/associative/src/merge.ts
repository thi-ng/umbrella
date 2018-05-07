/**
 * Merges all given maps in left-to-right order into `m`.
 * Returns `m`.
 *
 * @param m
 * @param maps
 */
export function mergeMap<K, V>(m: Map<K, V>, ...maps: Map<K, V>[]) {
    for (let mm of maps) {
        for (let p of mm) {
            m.set(p[0], p[1]);
        }
    }
    return m;
}

/**
 * Merges all given objects in left-to-right order into `m`.
 * Returns `m`.
 *
 * @param m
 * @param maps
 */
export function mergeObj(m, ...maps: any[]) {
    return Object.assign(m, ...maps);
}
