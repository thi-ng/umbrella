import { ENTITIES, ENTITY_RE } from "./api";

export const escape = (x: string) => x.replace(ENTITY_RE, (y) => ENTITIES[y]);
