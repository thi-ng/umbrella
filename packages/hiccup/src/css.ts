import { deref } from "@thi.ng/api/deref";
import { isFunction } from "@thi.ng/checks/is-function";

export const css = (rules: any) => {
	let css = "";
	let v: any;
	for (let r in rules) {
		v = deref(rules[r]);
		if (isFunction(v)) v = v(rules);
		if (v != null) css += `${r}:${v};`;
	}
	return css;
};
