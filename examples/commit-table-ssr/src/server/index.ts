import { TLRUCache } from "@thi.ng/cache";
import express from "express";
import * as fs from "fs";
// @ts-ignore fixme
import * as Bundler from "parcel-bundler";
import type { Commit } from "../common/api";
import { ctx } from "../common/config";
import { buildRepoTableHTML } from "./build-table";
import { repoCommits } from "./git";

// building the repo commit table takes quite some time
// therefore we cache results with 1h expiry time
// (which is also the default)
const rawCache = new TLRUCache<string, Commit[]>(undefined, {
	ttl: 60 * 60 * 1000,
});
const htmlCache = new TLRUCache<string, string>(undefined, {
	ttl: 60 * 60 * 1000,
});

const bundler = new Bundler("index.html", {
	outDir: "./out",
	outFile: "index.html",
	publicUrl: "/out",
});

const getCommits = async () => {
	const commits = [...repoCommits(ctx.repo.path)];
	fs.writeFileSync("commits.json", JSON.stringify(commits));
	return commits;
};

const app = express();

// route for browser version
// here we simply redirect to the Parcel managed client version
app.get("/", (_, res) => {
	res.redirect("/out/");
});

// route for the client to retrieve the commit log as JSON
app.get("/commits", (_, res) => {
	// retrieve raw commit log from cache or
	// (re)create if missing...
	rawCache
		.getSet(ctx.repo.path, getCommits)
		.then((commits) => res.type("json").send(commits));
});

// route for server-side rendering
// uses both caches
app.get("/ssr", (_, res) => {
	// retrieve rendered html from cache or
	// (re)create if missing...
	htmlCache
		.getSet(ctx.repo.path, async () =>
			buildRepoTableHTML(await rawCache.getSet(ctx.repo.path, getCommits))
		)
		.then((doc) => res.send(doc));
});

app.use(express.static("."));
app.use(bundler.middleware());

console.log("starting server @ http://localhost:8080");
app.listen(8080);
