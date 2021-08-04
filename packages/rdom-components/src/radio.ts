import type { Fn, Fn2 } from "@thi.ng/api";
import { div, InputRadioAttribs, label, radio } from "@thi.ng/hiccup-html";
import { $input, ComponentLike } from "@thi.ng/rdom";
import type { ISubscription } from "@thi.ng/rstream";

export interface RadioOpts<T> {
    attribs: Partial<InputRadioAttribs>;
    label: Fn2<T, ComponentLike, ComponentLike>;
    value: Fn<T, string>;
}

export const staticRadio = <T = string>(
    items: T[],
    sel: ISubscription<string, string>,
    opts?: Partial<RadioOpts<T>>
) => {
    opts = {
        label: (x, radio) => label({ for: String(x) }, String(x), radio),
        value: String,
        ...opts,
    };
    return div(
        { ...opts.attribs },
        ...items.map($radio(sel, <Required<RadioOpts<T>>>opts))
    );
};

const $radio =
    <T>(sel: ISubscription<string, string>, opts: RadioOpts<T>) =>
    (x: T) => {
        let v = opts.value(x);
        return opts.label(
            x,
            radio({
                value: v,
                checked: sel.map((x) => v === x),
                onchange: $input(sel),
            })
        );
    };
