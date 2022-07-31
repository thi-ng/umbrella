import type { Fn, Fn2 } from "@thi.ng/api";

export interface ZipperOps<T> {
	branch: Fn<T, boolean>;
	children: Fn<T, T[]>;
	factory: Fn2<T, T[], T>;
}

export interface Path<T> {
	l?: T[];
	r?: T[];
	path?: Path<T>;
	nodes: T[];
	changed: boolean;
}
