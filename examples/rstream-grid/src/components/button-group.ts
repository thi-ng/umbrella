import { AppContext } from "../api";
import { button } from "./button";

export const buttonGroup = (ctx: AppContext, ...buttons) =>
    ["section", ctx.ui.buttongroup, buttons.map((bt) => [button, ...bt])];
