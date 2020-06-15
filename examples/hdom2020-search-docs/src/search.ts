import { IObjectOf } from "@thi.ng/api";
import { compareByKeys2 } from "@thi.ng/compare";

type PackedTrie = [IObjectOf<PackedTrie>, number[]?];

type SearchIndex = [string[], PackedTrie];

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
    if (node[1]) return acc.concat(node[1].map((i) => [prefix, i]));
    return acc;
};

export const search = (
    [files, root]: SearchIndex,
    key: string,
    prefix = key
) => {
    root = find(root, key);
    return root
        ? suffixes(root, prefix)
              .map(([k, i]) => [k, files[i]])
              .sort(compareByKeys2(0, 1))
        : undefined;
};

export const indexSize = ([files, root]: SearchIndex) => {
    let num = 0;
    const walk = (n: PackedTrie) => {
        num++;
        for (let k in n[0]) walk(n[0][k]);
    };
    walk(root);
    return { files: files.length, keys: num };
};
