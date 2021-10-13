import type {
    Attribs,
    AttribVal,
    BooleanAttrib,
    NumericAttrib,
} from "./api.js";
import { defElement, defElements } from "./def.js";

export interface OrderedListAttribs extends Attribs {
    reversed: BooleanAttrib;
    start: NumericAttrib;
    type: AttribVal<"1" | "a" | "A" | "i" | "I">;
}

export interface ListItemAttribs extends Attribs {
    value: NumericAttrib;
}

export const ol = defElement<Partial<OrderedListAttribs>>("ol");

export const li = defElement<Partial<ListItemAttribs>>("li");

export const [ul, dl, dt, dd, datalist] = defElements([
    "ul",
    "dl",
    "dt",
    "dd",
    "datalist",
]);
