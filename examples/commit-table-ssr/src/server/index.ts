import { TLRUCache } from "@thi.ng/cache";
import { readText, writeJSON } from "@thi.ng/file-io";
import { ConsoleLogger } from "@thi.ng/logger";
import express from "express";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";
import type { Commit } from "../common/api.js";
import { ctx } from "../common/config.js";
import { buildRepoTableHTML } from "./build-table.js";
import { repoCommits } from "./git.js";

const LOGGER = new ConsoleLogger("server");

// building the repo commit table takes quite some time
// therefore we cache results with 1h expiry time
// (which is also the default)
const rawCache = new TLRUCache<string, Commit[]>(undefined, {
	ttl: 60 * 60 * 1000,
});
const htmlCache = new TLRUCache<string, string>(undefined, {
	ttl: 60 * 60 * 1000,
});

const getCommits = async () => {
	const commits = [...repoCommits(ctx.repo.path)];
	writeJSON("commits.json", commits, undefined, undefined, LOGGER);
	return commits;
};

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createServer() {
	const app = express();

	// https://vitejs.dev/guide/ssr#setting-up-the-dev-server
	const vite = await createViteServer({
		server: { middlewareMode: true },
		appType: "custom",
	});

	// route for browser version
	app.get("/", async (req, res, next) => {
		try {
			const template = await vite.transformIndexHtml(
				req.originalUrl,
				readText(resolve(__dirname, "../../index.html"), LOGGER)
			);
			res.status(200).set({ "Content-Type": "text/html" }).end(template);
		} catch (e) {
			vite.ssrFixStacktrace(<Error>e);
			next(e);
		}
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
				buildRepoTableHTML(
					await rawCache.getSet(ctx.repo.path, getCommits)
				)
			)
			.then((doc) => res.send(doc));
	});

	// inject middleware after our routes, else our handlers will not be used!
	app.use(vite.middlewares);

	LOGGER.info("starting server @ http://localhost:5173");
	app.listen(5173);
}

createServer();
