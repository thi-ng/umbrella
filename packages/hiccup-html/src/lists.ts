import { Attribs, AttribVal } from "./api";
import { defElement, defElements } from "./def";

export interface OrderedListAttribs extends Attribs {
    reversed: AttribVal<boolean>;
    start: AttribVal<number>;
    type: AttribVal<"1" | "a" | "A" | "i" | "I">;
}

export interface ListItemAttribs extends Attribs {
    value: AttribVal<number>;
}

export const ol = defElement<Partial<OrderedListAttribs>>("ol");

export const li = defElement<Partial<ListItemAttribs>>("li");

export const [ul, dl, dt, dd] = defElements(["ul", "dl", "dt", "dd"]);
