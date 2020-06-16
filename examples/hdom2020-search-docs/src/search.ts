import { IObjectOf } from "@thi.ng/api";
import { compareByKeys2 } from "@thi.ng/compare";

type PackedTrie = [IObjectOf<PackedTrie>, number[]?];

interface SearchIndex {
    packages: string[];
    files: string[];
    root: PackedTrie;
    numFiles: number;
    numKeys: number;
}

const decode = (id: number) => [id & 0xff, (id >>> 8) & 0xfff, id >>> 20];

const find = (node: PackedTrie, key: string) => {
    for (let i = 0, n = key.length; node && i < n; i++) {
        node = node[0][key[i]];
    }
    return node;
};

const suffixes = (
    node: PackedTrie,
    prefix: string,
    acc: [string, number][] = []
) => {
    for (let k in node[0]) {
        acc = suffixes(node[0][k], prefix + k, acc);
    }
    if (node[1]) return acc.concat(node[1].map((i) => [prefix, i]));
    return acc;
};

export const search = (
    { packages, files, root }: SearchIndex,
    key: string,
    prefix = key
) => {
    root = find(root, key);
    return root
        ? suffixes(root, prefix)
              .map(([k, val]) => {
                  const [p, f, ln] = decode(val);
                  return [k, `${packages[p]}/src/${files[f]}.ts#L${ln}`];
              })
              .sort(compareByKeys2(0, 1))
        : undefined;
};
