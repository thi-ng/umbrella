import { readText } from "@thi.ng/file-io";
import { resolve } from "path";
import type { TemplateFn } from "../api.js";

/**
 * Parametric template function. Includes file given as template argument:
 * `{{include header.md}}`
 *
 * @param ctx
 * @param args
 * @param currPath
 */
export const includeFile: TemplateFn = ({ logger }, args, currPath) =>
	readText(resolve(resolve(currPath, ".."), args[2].trim()), logger);

/**
 * Pre-processing stage parametric template function. Includes file given as
 * template argument: `<!-- include header.md -->`.
 *
 * @param ctx
 * @param args
 * @param currPath
 */
export const preincludeFile: TemplateFn = ({ logger }, [src], currPath) =>
	src.replace(new RegExp(`<!-- include (.+) -->`, "g"), (_, path) =>
		readText(resolve(resolve(currPath, ".."), path.trim()), logger)
	);
