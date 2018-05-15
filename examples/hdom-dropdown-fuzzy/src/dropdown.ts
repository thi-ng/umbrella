import { IObjectOf } from "@thi.ng/api/api";
import { ReadonlyAtom } from "@thi.ng/atom/api";
import { isString } from "@thi.ng/checks";
import { appLink } from "@thi.ng/hdom-components/link";
import { EV_SET_VALUE, EV_TOGGLE_VALUE } from "@thi.ng/interceptors/api";
import { EventBus } from "@thi.ng/interceptors/event-bus";
import { getIn, Path } from "@thi.ng/paths";

export interface BaseContext {
    bus: EventBus;
    state: ReadonlyAtom<any>;
}

export interface DropdownArgs {
    state: DropdownState;
    statePath: Path;
    ontoggle: EventListener;
    onchange: (id: any) => EventListener;
    attribs: IObjectOf<any>;
    hoverLabel: any;
    openLabel: any;
    noItems: any;
    onmouseover: EventListener;
    onmouseleave: EventListener;
}

export interface DropdownState {
    open: boolean;
    hover: boolean;
    selected: any;
    items: DropdownItem[];
}

export type DropdownItem = [any, any];

export interface DropdownTheme {
    root: IObjectOf<any>;
    bodyOpen: IObjectOf<any>;
    bodyClosed: IObjectOf<any>;
    item: IObjectOf<any>;
    itemSelected: IObjectOf<any>;
    itemDisabled: IObjectOf<any>;
}

export function dropdown(themeCtxPath: Path) {
    return (ctx: any, opts: Partial<DropdownArgs>) => {
        const ui: DropdownTheme = getIn(ctx, themeCtxPath);
        const state = opts.statePath ? getIn(ctx, opts.statePath) : opts.state;
        const hattribs = {
            onmouseover: opts.onmouseover,
            onmouseleave: opts.onmouseleave,
        };
        return state.open ?
            ["div", { ...ui.root, onkeydown: (e) => console.log(e) },
                [appLink, { ...hattribs, ...ui.itemSelected }, opts.ontoggle, opts.openLabel || opts.hoverLabel],
                ["div", ui.bodyOpen,
                    state.items.length ?
                        state.items.map(
                            (x) =>
                                ["a",
                                    {
                                        ...x[0] === state.selected ? ui.itemSelected : ui.item,
                                        href: "#",
                                        onclick: opts.onchange(x[0]),
                                    },
                                    ...(isString(x[1]) ? [x[1]] : x[1])]
                        ) :
                        ["span", ui.itemDisabled, opts.noItems]]] :
            ["div", ui.root,
                [appLink, { ...hattribs, ...ui.item }, opts.ontoggle,
                    state.hover ?
                        opts.hoverLabel :
                        (state.items.find((x) => x[0] === state.selected) ||
                            [, opts.hoverLabel])[1]],
                ["div", ui.bodyClosed]];
    };
}

export const dropdownListeners = (ctx: BaseContext, basePath: PropertyKey[]) => ({
    onmouseover: () => ctx.bus.dispatch([EV_SET_VALUE, [[...basePath, "hover"], true]]),
    onmouseleave: () => ctx.bus.dispatch([EV_SET_VALUE, [[...basePath, "hover"], false]]),
    ontoggle: () => ctx.bus.dispatch([EV_TOGGLE_VALUE, [...basePath, "open"]]),
    onchange: (x) => () => {
        ctx.bus.dispatch(
            [EV_SET_VALUE, [[...basePath, "selected"], x]],
            [EV_SET_VALUE, [[...basePath, "open"], false]]
        );
    }
});
