import { IObjectOf } from "@thi.ng/api";
import { Trie } from "@thi.ng/associative";

type PackedTrie = [IObjectOf<PackedTrie>, number[]?];

interface SearchIndex {
    packages: string[];
    files: string[];
    root: PackedTrie;
    numFiles: number;
    numKeys: number;
}

export const encode = (pkg: number, file: number, line: number) =>
    (line << 20) | (file << 8) | pkg;

export const decode = (id: number) => [
    id & 0xff,
    (id >>> 8) & 0xfff,
    id >>> 20,
];

const pack = (trie: Trie<string, number>): PackedTrie => {
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
    pkgs: Map<string, number>,
    files: Map<string, number>,
    numFiles: number,
    numKeys: number,
    trie: Trie<string, number>
): SearchIndex => ({
    packages: mapToArray(pkgs),
    files: mapToArray(files),
    root: pack(trie),
    numFiles,
    numKeys,
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

export const search = ({ packages, files, root }: SearchIndex, key: string) => {
    root = find(root, key);
    return root
        ? suffixes(root, key).map(([k, val]) => {
              const [p, f, ln] = decode(val);
              return [k, `${packages[p]}/src/${files[f]}.ts#L${ln}`];
          })
        : undefined;
};
