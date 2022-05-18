import { existsSync, mkdirSync } from "fs";
import { sep } from "path";

/**
 * Checks if the directory for given file path already exists, and if not the
 * case, creates it. Returns true if the latter case.
 *
 * @param path
 */
export const ensureDirForFile = (path: string) => {
    const dir = path.substring(0, path.lastIndexOf(sep));
    return !existsSync(dir)
        ? (mkdirSync(dir, { recursive: true }), true)
        : false;
};
