import { ENTITIES, RE_ENTITY } from "./api";

export const escape = (x: string) => x.replace(RE_ENTITY, (y) => ENTITIES[y]);
