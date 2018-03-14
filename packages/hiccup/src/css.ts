import { isFunction } from "@thi.ng/checks/is-function";

export const css = (rules: any) => {
    const css = [];
    for (let r in rules) {
        if (rules.hasOwnProperty(r)) {
            let v = rules[r];
            if (isFunction(v)) {
                v = v(rules);
            }
            css.push(r + ":" + v + ";");
        }
    }
    return css.join("");
};
