import { fattribs } from "./format";

export const group = (attribs: any, ...body: any[]): any[] => [
    "g",
    fattribs({ ...attribs }),
    ...body,
];
