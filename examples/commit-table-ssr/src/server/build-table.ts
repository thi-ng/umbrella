// SPDX-License-Identifier: Apache-2.0
import type { Commit } from "../common/api.js";
import { header } from "../common/components/header.js";
import { repoTable } from "../common/components/repo-table.js";
import { ctx } from "../common/config.js";
import { html } from "./html.js";

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
