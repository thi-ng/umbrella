// SPDX-License-Identifier: Apache-2.0
import { TLRUCache } from "@thi.ng/cache";
import { readText, writeJSON } from "@thi.ng/file-io";
import { ConsoleLogger } from "@thi.ng/logger";
import { createServer } from "node:http";
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

// https://vitejs.dev/guide/ssr#setting-up-the-dev-server
const vite = await createViteServer({
	server: { middlewareMode: true },
	appType: "custom",
});

const server = createServer(async (req, res) => {
	switch (req.url) {
		case "/":
			{
				try {
					const template = await vite.transformIndexHtml(
						req.url,
						readText(resolve(__dirname, "../../index.html"), LOGGER)
					);
					res.writeHead(200)
						.setHeader("Content-Type", "text/html")
						.end(template);
				} catch (e) {
					vite.ssrFixStacktrace(<Error>e);
					vite.middlewares(req, res);
				}
			}
			break;
		case "/commits":
			{
				const commits = await rawCache.getSet(
					ctx.repo.path,
					getCommits
				);
				res.setHeader("Content-Type", "application/json").end(
					JSON.stringify(commits)
				);
			}
			break;
		case "/ssr":
			{
				const doc = await htmlCache.getSet(ctx.repo.path, async () =>
					buildRepoTableHTML(
						await rawCache.getSet(ctx.repo.path, getCommits)
					)
				);
				res.setHeader("Content-Type", "text/html").end(doc);
			}
			break;
		default:
			vite.middlewares(req, res);
			break;
	}
});

LOGGER.info("starting server @ http://localhost:5173");
server.listen(5173);
