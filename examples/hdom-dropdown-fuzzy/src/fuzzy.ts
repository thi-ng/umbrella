import { IView } from "@thi.ng/atom/api";
import { EV_SET_VALUE } from "@thi.ng/interceptors/api";
import { filterFuzzy, iterator } from "@thi.ng/transducers";
import { dropdownListeners, DropdownState } from "./dropdown";

export interface FuzzyArgs {
    state: IView<DropdownState>;
    filter: IView<string>;
    dropdown: any;
    input: any;
    hoverLabel: any;
    placeholder: string;
}

export const fuzzyDropdown = (ctx, opts: FuzzyArgs) => {
    const filterInput = [opts.input, {
        state: opts.filter.deref(),
        placeholder: opts.placeholder,
        oninput: (e) => ctx.bus.dispatch([EV_SET_VALUE, [opts.filter.path, e.target.value]]),
        oncancel: () => ctx.bus.dispatch([EV_SET_VALUE, [opts.state.path + ".open", false]]),
        onconfirm: () => ctx.bus.dispatch([EV_SET_VALUE, [opts.state.path + ".open", false]])
    }];
    return () => {
        const state = { ...opts.state.deref() };
        if (opts.filter) {
            state.items = [
                ...iterator(
                    filterFuzzy(
                        opts.filter.deref().toLowerCase(),
                        (x: [any, any]) => x[1].toLowerCase()),
                    state.items)
            ];
        }
        return [opts.dropdown, {
            ...dropdownListeners(ctx, opts.state.path),
            openLabel: filterInput,
            hoverLabel: opts.hoverLabel,
            state
        }];
    };
};
