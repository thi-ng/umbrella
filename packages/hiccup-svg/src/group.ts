import { fattribs } from "./format.js";

export const group = (attribs: any, ...body: any[]): any[] => [
	"g",
	fattribs({ ...attribs }),
	...body,
];
