import type { NumOrString } from "@thi.ng/api";
import { satisfy } from "./satisfy";

export const range = <T extends NumOrString>(min: T, max: T, id = "lit") =>
    satisfy<T>((x) => x >= min && x <= max, id);
