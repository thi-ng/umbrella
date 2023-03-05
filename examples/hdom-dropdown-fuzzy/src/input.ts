import type { Path } from "@thi.ng/api";
import type { IView } from "@thi.ng/atom";
import { getInUnsafe } from "@thi.ng/paths";

export interface InputArgs {
	state: IView<any>;
	orig: IView<any>;
	attribs: any;
	placeholder: string;
	oninput: EventListener;
	oncancel: EventListener;
	onconfirm: EventListener;
	onclear: EventListener;
	onblur: EventListener;
}

export function cancelableInput(themeCtxPath: Path) {
	let input: HTMLElement;
	return {
		init: (el: HTMLElement) => (input = <HTMLElement>el.firstChild).focus(),
		render: (ctx: any, args: InputArgs) => [
			"span.relative",
			[
				"input",
				{
					...getInUnsafe(ctx, themeCtxPath),
					...args.attribs,
					type: "text",
					oninput: args.oninput,
					onblur: args.onblur,
					onkeydown: (e: KeyboardEvent) => {
						switch (e.key) {
							case "Escape":
								args.oncancel && args.oncancel(e);
								(<HTMLElement>e.target).blur();
								break;
							case "Enter":
								// case "Tab":
								args.onconfirm && args.onconfirm(e);
								(<HTMLInputElement>e.target).blur();
								break;
							default:
						}
					},
					placeholder: args.placeholder,
					value: args.state,
				},
			],
			args.onclear
				? [
						"a",
						{
							href: "#",
							onclick: (e: Event) => {
								e.stopPropagation();
								input.focus();
								args.onclear(e);
							},
						},
						[
							"i.absolute.fas.fa-times-circle.gray.f7",
							{ style: { right: "0.5rem", top: "0.25rem" } },
						],
				  ]
				: undefined,
		],
	};
}
