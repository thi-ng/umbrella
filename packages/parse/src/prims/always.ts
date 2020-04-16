import { satisfy } from "./satisfy";

export const always = (id = "always") => satisfy<any>(() => true, id);
