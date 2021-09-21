import { implementsFunction } from "@thi.ng/checks/implements-function";
import type { IComponent } from "./api";

export const isComponent = (x: any): x is IComponent<any> =>
    implementsFunction(x, "mount");
