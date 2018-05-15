import { Path } from "@thi.ng/api/api";
import { getIn } from "@thi.ng/paths";
import { IView } from "@thi.ng/atom/api";

export interface InputArgs {
    state: IView<any>;
    orig: IView<any>;
    attribs: any;
    placeholder: string;
    oninput: EventListener;
    oncancel: EventListener;
    onconfirm: EventListener;
}

export function cancelableInput(themeCtxPath: Path) {
    return (_, args: InputArgs) => [{
        init: (el) => el.focus(),
        render: (ctx) =>
            ["input",
                {
                    ...getIn(ctx, themeCtxPath),
                    ...args.attribs,
                    type: "text",
                    oninput: args.oninput,
                    onkeydown: (e: KeyboardEvent) => {
                        switch (e.key) {
                            case "Escape":
                                args.oncancel && args.oncancel(e);
                                (<HTMLElement>e.target).blur();
                                break;
                            case "Enter":
                                args.onconfirm && args.onconfirm(e);
                                (<HTMLInputElement>e.target).blur();
                                break;
                            default:
                        }
                    },
                    placeholder: args.placeholder,
                    value: args.state
                }
            ]
    }];
}
