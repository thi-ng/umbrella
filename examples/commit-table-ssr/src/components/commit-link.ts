import { AppContext } from "../api";
import { link } from "./link";

export const commitLink = (ctx: AppContext, sha: string, msg: string) =>
    [link, `${ctx.repo.url}/commit/${sha}`, msg];
