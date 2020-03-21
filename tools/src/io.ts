import { readFileSync } from "fs";

export const readJSON = (path: string) => JSON.parse(<any>readFileSync(path));

export const readText = (path: string) => readFileSync(path).toString();
