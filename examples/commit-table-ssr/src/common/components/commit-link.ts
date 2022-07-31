import type { AppContext } from "../api";
import { link } from "./link";

/**
 * Link component which links to given SHA commit hash using the
 * context's repo URL.
 *
 * @param ctx -
 * @param sha -
 * @param body -
 */
export const commitLink = (ctx: AppContext, sha: string, body: string) => [
	link,
	{ ...ctx.ui.link, href: `${ctx.repo.url}/commit/${sha}` },
	body,
];
