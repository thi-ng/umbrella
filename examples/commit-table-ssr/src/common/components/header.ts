import type { AppContext } from "../api";

export const header = (ctx: AppContext, title: string) => [
    "section",
    ctx.ui.header.root,
    ["h1", ctx.ui.header.title, title],
];
