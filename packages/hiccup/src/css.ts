import { isFunction } from "@thi.ng/checks/is-function";

export const css =
    (rules: any) => {
        let css = "", v;
        for (let r in rules) {
            v = rules[r];
            if (isFunction(v)) {
                v = v(rules);
            }
            v != null && (css += `${r}:${v};`);
        }
        return css;
    };
