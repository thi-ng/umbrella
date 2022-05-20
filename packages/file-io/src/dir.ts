import { existsSync, mkdirSync, statSync } from "fs";
import { sep } from "path";

/**
 * Checks if the directory for given file `path` already exists, and if not the
 * case, creates it. Returns true if the latter case.
 *
 * @remarks
 * If `path` only contains a filename (without any directory structure), the
 * function does nothing.
 *
 * @param path
 */
export const ensureDirForFile = (path: string) => {
    const dir = path.substring(0, path.lastIndexOf(sep));
    return dir.length > 0 && !existsSync(dir)
        ? (mkdirSync(dir, { recursive: true }), true)
        : false;
};

/**
 * Returns true if `path` is a directory (assumes path exists).
 *
 * @param path
 */
export const isDirectory = (path: string) => statSync(path).isDirectory();
