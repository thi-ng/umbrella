import type { BitField } from "@thi.ng/bitfield";

export interface Item {
	url: string;
	tags: string[];
	encoded?: BitField;
	aspect?: number;
}

export type RankedItem = [Item, number, number];

export type LayoutItem = {
	x: number;
	y: number;
	w: number;
	h: number;
	item: RankedItem;
};
