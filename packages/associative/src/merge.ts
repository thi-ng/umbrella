export function mergeMaps<K, V>(m: Map<K, V>, ...maps: Map<K, V>[]) {
    for (let mm of maps) {
        for (let p of mm) {
            m.set(p[0], p[1]);
        }
    }
    return m;
}

export function mergeObj(m, ...maps: any[]) {
    return Object.assign(m, ...maps);
}
