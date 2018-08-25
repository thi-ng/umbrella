import { header } from "./components/header";
import { repoTable } from "./components/repo-table";
import { ctx } from "./config";
import { repoCommits } from "./git";
import { html } from "./html";

/**
 * Shared function used by both the server and for static file
 * generation. Returns serialized HTML string of commit table.
 */
export const buildRepoTableHTML = () =>
    html({
        ctx,
        body: [
            [header, ctx.repo.name],
            [repoTable, repoCommits(ctx.repo.path)],
        ]
    });
