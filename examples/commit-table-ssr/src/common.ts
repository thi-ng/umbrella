import { header } from "./components/header";
import { repoTable } from "./components/repo-table";
import { ctx } from "./config";
import { repoCommits } from "./git";
import { html } from "./html";

export const buildRepoTableHTML = () =>
    html({
        ctx,
        body: [
            [header, ctx.repo.name],
            [repoTable, repoCommits(ctx.repo.path)]
        ]
    });
