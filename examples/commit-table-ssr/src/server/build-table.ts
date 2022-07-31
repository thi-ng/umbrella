import type { Commit } from "../common/api";
import { header } from "../common/components/header";
import { repoTable } from "../common/components/repo-table";
import { ctx } from "../common/config";
import { html } from "./html";

/**
 * Shared function used by both the server and for static file
 * generation. Returns serialized HTML string of commit table.
 */
export const buildRepoTableHTML = (commits: Iterable<Commit>) =>
	html({
		ctx,
		body: [
			[header, ctx.repo.name],
			[repoTable, commits],
		],
	});
