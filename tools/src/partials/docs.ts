import { CONFIG } from "../config.js";
import { link } from "./link.js";
import { shortName } from "./package.js";

export const docLink = (pkgName: string) =>
	link("Generated API docs", `${CONFIG.docURL}/${shortName(pkgName)}/`);
