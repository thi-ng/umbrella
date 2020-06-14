import { button } from "./button";
import type { AppContext } from "../api";

export function buttonGroup(ctx: AppContext, ...buttons: any[]) {
    return [
        "section",
        ctx.ui.buttongroup,
        buttons.map((bt) => [button, ...bt]),
    ];
}
