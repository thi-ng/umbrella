import type { BlogPost } from "../api.js";
import { link } from "./link.js";
import { list } from "./list.js";

export const blogPosts = (posts: BlogPost[]) => {
	return [
		"### Blog posts",
		"",
		list(posts.map(({ title, url }) => link(title, url))),
	].join("\n");
};
