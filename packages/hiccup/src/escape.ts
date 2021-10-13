import { ENTITIES, RE_ENTITY } from "./api.js";

export const escape = (x: string) => x.replace(RE_ENTITY, (y) => ENTITIES[y]);
