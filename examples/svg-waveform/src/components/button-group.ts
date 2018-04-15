import { AppContext } from "../api";
import { button } from "./button";

export function buttonGroup(ctx: AppContext, ...buttons) {
    return ["section", ctx.ui.buttongroup,
        buttons.map((bt) => [button, ...bt])
    ];
}
