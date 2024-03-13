import { FORMAT_MD, suite } from "@thi.ng/bench";
import { Router } from "../src/router.js";

const iter = 1_000_000;
const size = 1_000_000;

// examples taken from:
// https://github.com/delvedor/router-benchmark
const router = new Router({
	default: "missing",
	routes: [
		{ id: "user", match: "/user" },
		{ id: "user-comments", match: "/user/comments" },
		{ id: "user-avatar", match: "/user/avatar" },
		{ id: "user-name", match: "/user/lookup/username/?username" },
		{ id: "user-email", match: "/user/lookup/email/?address" },
		{ id: "event", match: "/event/?id" },
		{ id: "event-comments", match: "/event/?id/comments" },
		{ id: "event-comment", match: "/event/?id/comment" },
		{ id: "map", match: "/map/?location/events" },
		{ id: "status", match: "/status" },
		{ id: "deep", match: "/very/deeply/nested/route/hello/there" },
		{ id: "static", match: "/static/+" },
		{ id: "missing", match: "/missing" },
	],
});

suite(
	[
		{
			title: "short static",
			fn: () => {
				for (let i = 0; i < size; i++) router.route("/user");
			},
		},
		{
			title: "static with same radix",
			fn: () => {
				for (let i = 0; i < size; i++) router.route("/user/comments");
			},
		},
		{
			title: "dynamic route",
			fn: () => {
				for (let i = 0; i < size; i++)
					router.route("/user/lookup/username/john");
			},
		},
		{
			title: "mixed static dynamic",
			fn: () => {
				for (let i = 0; i < size; i++)
					router.route("/event/abcd1234/comments");
			},
		},
		{
			title: "long static",
			fn: () => {
				for (let i = 0; i < size; i++)
					router.route("/very/deeply/nested/route/hello/there");
			},
		},
		{
			title: "wildcard",
			fn: () => {
				for (let i = 0; i < size; i++)
					router.route("/static/index.html");
			},
		},
		{
			title: "all together",
			fn: () => {
				for (let i = 0; i < size; i++) {
					router.route("/user");
					router.route("/user/comments");
					router.route("/user/lookup/username/john");
					router.route("/event/abcd1234/comments");
					router.route("/very/deeply/nested/route/hello/there");
					router.route("/static/index.html");
				}
			},
		},
	],
	{
		iter: iter / size,
		warmup: 1e5 / size,
		extSize: size,
		format: FORMAT_MD,
	}
);
