import type { IObjectOf } from "@thi.ng/api";
import { compareByKeys2 } from "@thi.ng/compare";

export type PackedTrie = [IObjectOf<PackedTrie>, number[]?];

export interface SearchIndex {
	bits: number[][];
	packages: string[];
	files: string[];
	root: PackedTrie;
	numFiles: number;
	numKeys: number;
	numVals: number;
}

const defDecoder =
	([[psh, pmsk], [fsh, fmsk], [lsh, lmsk]]: number[][]) =>
	(id: number) =>
		[(id >>> psh) & pmsk, (id >>> fsh) & fmsk, (id >>> lsh) & lmsk];

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
