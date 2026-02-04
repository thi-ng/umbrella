import type { BidirIndex } from "@thi.ng/bidir-index";

/** @internal */
export const __serializeDict = (dict: BidirIndex<any>) => {
	const res: any = [];
	for (let [val, id] of dict.entries()) res[id] = val;
	return { index: res, next: dict.nextID };
};
