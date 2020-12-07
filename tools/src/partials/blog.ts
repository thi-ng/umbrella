import type { BlogPost } from "../api";
import { link } from "./link";
import { list } from "./list";

export const blogPosts = (posts: BlogPost[]) => {
    if (!posts) return;
    return [
        "### Blog posts",
        "",
        list(posts.map(({ title, url }) => link(title, url))),
    ].join("\n");
};
