import type { AppContext } from "../api";
import { button } from "./button";

export const buttonGroup = (ctx: AppContext, ...buttons: any[]) => [
    "section",
    ctx.ui.buttongroup,
    buttons.map((bt) => [button, ...bt]),
];
