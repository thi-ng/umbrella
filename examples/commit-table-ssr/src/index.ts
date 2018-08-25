import { TLRUCache } from "@thi.ng/cache";
import * as express from "express";

import { header } from "./components/header";
import { repoTable } from "./components/repo-table";
import { ctx } from "./config";
import { repoCommits } from "./git";
import { html } from "./html";

// building the repo commit table takes quite some time
// therefore we cache results in a cache with 1h expiry time
// (which is also the default)
const cache = new TLRUCache<string, string>(null, { ttl: 60 * 60 * 1000 });

const app = express();

app.get('/', (_, res) => {
    // retrieve rendered html from cache or
    // (re)create if missing...
    cache.getSet(
        ctx.repo.path,
        async () =>
            html({
                ctx,
                body: [
                    [header, ctx.repo.name],
                    [repoTable, repoCommits(ctx.repo.path)]
                ]
            })
    ).then((doc) => res.send(doc));
});

app.listen(3000);
