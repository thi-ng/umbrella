import { CONFIG } from "../config";
import { link } from "./link";
import { shortName } from "./package";

export const docLink = (pkgName: string) =>
    link("Generated API docs", `${CONFIG.docURL}/${shortName(pkgName)}/`);
