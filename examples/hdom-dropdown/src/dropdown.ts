import type { Fn, IObjectOf, Path } from "@thi.ng/api";
import type { ReadonlyAtom } from "@thi.ng/atom";
import { appLink } from "@thi.ng/hdom-components/link";
import { EventBus, EV_SET_VALUE, EV_TOGGLE_VALUE } from "@thi.ng/interceptors";
import { getInUnsafe } from "@thi.ng/paths/get-in";

export interface BaseContext {
	bus: EventBus;
	state: ReadonlyAtom<any>;
}

export interface DropdownArgs {
	state: DropdownState;
	statePath: Path;
	ontoggle: EventListener;
	onchange: Fn<any, EventListener>;
	attribs: IObjectOf<any>;
	hoverLabel: any;
	onmouseover: EventListener;
	onmouseleave: EventListener;
}

export interface DropdownState {
	open: boolean;
	hover: boolean;
	selected: any;
	items: [any, any][];
}

export interface DropdownTheme {
	root: IObjectOf<any>;
	bodyOpen: IObjectOf<any>;
	bodyClosed: IObjectOf<any>;
	item: IObjectOf<any>;
	itemSelected: IObjectOf<any>;
}

export function dropdown(themeCtxPath: Path) {
	return (ctx: any, opts: Partial<DropdownArgs>) => {
		const ui: DropdownTheme = getInUnsafe(ctx, themeCtxPath)!;
		const state = opts.statePath
			? getInUnsafe(ctx, opts.statePath)
			: opts.state;
		const hattribs = {
			onmouseover: opts.onmouseover,
			onmouseleave: opts.onmouseleave,
		};
		return state.open
			? [
					"div",
					ui.root,
					[
						appLink,
						{ ...hattribs, ...ui.itemSelected },
						opts.ontoggle,
						opts.hoverLabel,
					],
					[
						"div",
						ui.bodyOpen,
						state.items.map((x: any) =>
							appLink(
								null,
								x[0] === state.selected
									? ui.itemSelected
									: ui.item,
								opts.onchange!(x[0]),
								x[1]
							)
						),
					],
			  ]
			: [
					"div",
					ui.root,
					[
						appLink,
						{ ...hattribs, ...ui.item },
						opts.ontoggle,
						state.hover
							? opts.hoverLabel
							: (state.items.find(
									(x: any) => x[0] === state.selected
							  ) || [, opts.hoverLabel])[1],
					],
					["div", ui.bodyClosed],
			  ];
	};
}

export const dropdownListeners = (
	ctx: BaseContext,
	basePath: PropertyKey[]
) => ({
	onmouseover: () =>
		ctx.bus.dispatch([EV_SET_VALUE, [[...basePath, "hover"], true]]),
	onmouseleave: () =>
		ctx.bus.dispatch([EV_SET_VALUE, [[...basePath, "hover"], false]]),
	ontoggle: () => ctx.bus.dispatch([EV_TOGGLE_VALUE, [...basePath, "open"]]),
	onchange: (x: any) => () => {
		ctx.bus.dispatch(
			[EV_SET_VALUE, [[...basePath, "selected"], x]],
			[EV_SET_VALUE, [[...basePath, "open"], false]]
		);
	},
});
