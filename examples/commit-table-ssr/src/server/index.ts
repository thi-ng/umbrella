import { TLRUCache } from "@thi.ng/cache";
import * as express from "express";

import { Commit } from "../common/api";
import { ctx } from "../common/config";
import { buildRepoTableHTML } from "./build-table";
import { repoCommits } from "./git";
import { html, script } from "./html";

// building the repo commit table takes quite some time
// therefore we cache results with 1h expiry time
// (which is also the default)
const rawCache = new TLRUCache<string, Commit[]>(null, { ttl: 60 * 60 * 1000 });
const htmlCache = new TLRUCache<string, string>(null, { ttl: 60 * 60 * 1000 });

const app = express();

app.use(express.static("."));

// route for browser version
// here we simply return a barebone html doc
// with a reference to the built client JS
app.get("/", (_, res) => {
    res.send(html({
        ctx,
        head: {
            title: "commit-table-hdom",
        },
        body: [
            ["div#app"],
            [script, { src: "bundle.js" }]
        ],
    }));
});

// route for the client to retrieve the commit log as JSON
app.get("/commits", (_, res) => {
    // retrieve raw commit log from cache or
    // (re)create if missing...
    rawCache.getSet(
        ctx.repo.path,
        async () => [...repoCommits(ctx.repo.path)]
    ).then(
        (commits) => res.type("json").send(commits)
    )
});

// route for server-side rendering
// uses both caches
app.get("/ssr", (_, res) => {
    // retrieve rendered html from cache or
    // (re)create if missing...
    htmlCache.getSet(
        ctx.repo.path,
        async () => buildRepoTableHTML(
            await rawCache.getSet(
                ctx.repo.path,
                async () => [...repoCommits(ctx.repo.path)]
            )
        )
    ).then((doc) => res.send(doc))
});

console.log("starting server @ http://localhost:3000");
app.listen(3000);
