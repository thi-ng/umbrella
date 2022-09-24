import { readText } from "@thi.ng/file-io";
import { RE_USER } from "../api.js";
import { CONFIG } from "../config.js";
import { link } from "./link.js";

export const userLink = (id: string): string =>
	link(`@${id}`, `${CONFIG.userURL}/${id}`);

export const authors = () => {
	try {
		return readText("./AUTHORS.md").replace(RE_USER, (_, id) =>
			userLink(id)
		);
	} catch (_) {}
	return CONFIG.mainAuthor;
};
