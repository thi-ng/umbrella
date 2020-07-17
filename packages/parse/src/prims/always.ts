import { satisfy, satisfyD } from "./satisfy";

export const always = (id = "always") => satisfy<any>(() => true, id);

export const alwaysD = () => satisfyD<any>(() => true);
