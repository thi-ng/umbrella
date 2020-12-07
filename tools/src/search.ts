import type { IObjectOf } from "@thi.ng/api";
import type { MultiTrie } from "@thi.ng/associative";
import { compareByKeys2 } from "@thi.ng/compare";

type PackedTrie = [IObjectOf<PackedTrie>, number[]?];

interface SearchIndex {
    bits: number[][];
    packages: string[];
    files: string[];
    root: PackedTrie;
    numFiles: number;
    numKeys: number;
    numVals: number;
}

export const defEncoder = ([[psh], [fsh], [lsh]]: number[][]) => (
    pkg: number,
    file: number,
    line: number
) => (line << lsh) | (file << fsh) | (pkg << psh);

export const defDecoder = ([
    [psh, pmsk],
    [fsh, fmsk],
    [lsh, lmsk],
]: number[][]) => (id: number) => [
    (id >>> psh) & pmsk,
    (id >>> fsh) & fmsk,
    (id >>> lsh) & lmsk,
];

const pack = (trie: MultiTrie<string, number>): PackedTrie => {
    const next = Object.keys((<any>trie).next).reduce((acc, k) => {
        acc[k] = pack((<any>trie).next[k]);
        return acc;
    }, <any>{});
    return (<any>trie).vals ? [next, [...(<any>trie).vals]] : [next];
};

const mapToArray = (m: Map<string, number>) => {
    const res = new Array<string>(m.size);
    for (let [k, v] of m) {
        res[v] = k;
    }
    return res;
};

export const build = (
    bits: number[][],
    pkgs: Map<string, number>,
    files: Map<string, number>,
    numFiles: number,
    numKeys: number,
    numVals: number,
    trie: MultiTrie<string, number>
): SearchIndex => ({
    bits,
    packages: mapToArray(pkgs),
    files: mapToArray(files),
    root: pack(trie),
    numFiles,
    numKeys,
    numVals,
});

export const find = (node: PackedTrie, key: string) => {
    for (let i = 0, n = key.length; node && i < n; i++) {
        node = node[0][key[i]];
    }
    return node;
};

export const suffixes = (
    node: PackedTrie,
    prefix: string,
    acc: [string, number][] = []
) => {
    for (let k in node[0]) {
        acc = suffixes(node[0][k], prefix + k, acc);
    }
    if (node[1]) return acc.concat(node[1].map((v) => [prefix, v]));
    return acc;
};

export const search = (
    { bits, packages, files, root }: SearchIndex,
    key: string,
    prefix = key
) => {
    root = find(root, key);
    const decode = defDecoder(bits);
    return root
        ? suffixes(root, prefix)
              .map(([k, val]) => {
                  const [p, f, ln] = decode(val);
                  return [k, `${packages[p]}/src/${files[f]}.ts#L${ln}`];
              })
              .sort(compareByKeys2(0, 1))
        : undefined;
};
