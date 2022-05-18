import type { Fn3, NumOrString } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";
import { readText, writeText } from "./text.js";

export const readJSON = (path: string, logger?: ILogger) =>
    JSON.parse(readText(path, logger));

export const writeJSON = (
    path: string,
    obj: any,
    replacer?: Fn3<any, string, any, any> | NumOrString[] | null | undefined,
    space?: NumOrString | undefined,
    logger?: ILogger
) => writeText(path, JSON.stringify(obj, <any>replacer, space), logger);
