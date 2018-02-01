import { ENTITY_RE, ENTITIES } from "./api";

export const escape = (x: string) => x.replace(ENTITY_RE, (y) => ENTITIES[y]);
