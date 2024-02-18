import { existsSync, mkdirSync, statSync } from "fs";
import { dirname } from "path";

/**
 * Assumes given path is to a directory. Checks if the dir exists and if not
 * attempts to create it and then returns true. Otherwise returns false.
 *
 * @param dir
 */
export const ensureDir = (dir: string) =>
	dir.length > 0 && !existsSync(dir)
		? (mkdirSync(dir, { recursive: true }), true)
		: false;

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
export const ensureDirForFile = (path: string) => ensureDir(dirname(path));

/**
 * Returns true if `path` is a directory (assumes path exists, if not throws an
 * error).
 *
 * @param path
 */
export const isDirectory = (path: string) => statSync(path).isDirectory();
