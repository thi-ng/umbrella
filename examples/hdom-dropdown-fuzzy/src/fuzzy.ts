import { IView } from "@thi.ng/atom/api";
import { EV_SET_VALUE } from "@thi.ng/interceptors/api";
import { comp } from "@thi.ng/transducers/func/comp";
import { iterator } from "@thi.ng/transducers/iterator";
import { filterFuzzy } from "@thi.ng/transducers/xform/filter-fuzzy";
import { map } from "@thi.ng/transducers/xform/map";

import { dropdownListeners, DropdownState, DropdownItem } from "./dropdown";

export interface FuzzyArgs {
    state: IView<DropdownState>;
    filter: IView<string>;
    dropdown: any;
    input: any;
    hoverLabel: any;
    placeholder: string;
}

export const fuzzyDropdown = (ctx, opts: FuzzyArgs) => {
    const close = () => ctx.bus.dispatch([EV_SET_VALUE, [opts.state.path + ".open", false]]);
    const filterInput = [opts.input, {
        state: opts.filter.deref(),
        placeholder: opts.placeholder,
        oninput: (e) => ctx.bus.dispatch([EV_SET_VALUE, [opts.filter.path, e.target.value]]),
        onclear: () => ctx.bus.dispatch([EV_SET_VALUE, [opts.filter.path, ""]]),
        oncancel: close,
        onconfirm: close,
    }];
    return () => {
        const state = { ...opts.state.deref() };
        const filter = opts.filter.deref().toLowerCase();
        if (filter && state.open) {
            state.items = [
                ...iterator(
                    comp(
                        filterFuzzy(filter, { key: (x: DropdownItem) => x[1].toLowerCase() }),
                        map(([id, x]) =>
                            <DropdownItem>[
                                id,
                                highlightMatches((y) => ["span", ctx.theme.fuzzy, y], x, filter)
                            ])
                    ),
                    state.items)
            ];
        }
        return [opts.dropdown, {
            ...dropdownListeners(ctx, opts.state.path),
            openLabel: filterInput,
            hoverLabel: opts.hoverLabel,
            noItems: "no matches",
            state
        }];
    };
};

const highlightMatches = (fn: (x: string) => any, x: string, filter: string) => {
    const res: any[] = [];
    let prev = -1, n = x.length - 1, m = filter.length;
    for (let i = 0, j = 0; i <= n && j < m; i++) {
        const c = x.charAt(i);
        if (c.toLowerCase() === filter.charAt(j)) {
            i - prev > 1 && res.push(x.substring(prev + 1, i));
            res.push(fn(c));
            prev = i;
            j++;
        }
    }
    prev < n && res.push(x.substr(prev + 1));
    return res;
};
