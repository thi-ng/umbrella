import { RE_USER } from "../api";
import { CONFIG } from "../config";
import { readText } from "../io";
import { link } from "./link";

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
