import type { Fn } from "@thi.ng/api";
import { option, select, SelectAttribs } from "@thi.ng/hiccup-html";
import { $input, $list } from "@thi.ng/rdom";
import type { ISubscribable, Subscription } from "@thi.ng/rstream";

export interface DropdownOpts<T> {
    attribs: Partial<SelectAttribs>;
    label: Fn<T, string>;
    value: Fn<T, string>;
}

export const dynamicDropdown = <T = string>(
    items: ISubscribable<T[]>,
    sel: Subscription<string, string>,
    opts?: Partial<DropdownOpts<T>>
) => {
    opts = {
        value: String,
        label: String,
        ...opts,
    };
    return $list<T>(
        items,
        "select",
        { ...opts!.attribs, onchange: $input(sel) },
        $option(sel, <Required<DropdownOpts<T>>>opts)
    );
};

export const staticDropdown = <T = string>(
    items: T[],
    sel: Subscription<string, string>,
    opts?: Partial<DropdownOpts<T>>
) => {
    opts = {
        value: String,
        label: String,
        ...opts,
    };
    return select(
        { ...opts.attribs, onchange: $input(sel) },
        ...items.map($option(sel, <Required<DropdownOpts<T>>>opts))
    );
};

const $option = <T>(
    sel: Subscription<string, string>,
    { label, value }: DropdownOpts<T>
) => (x: T) => {
    let v = value(x);
    return option({ value: v, selected: v === sel.deref() }, label(x));
};
