import { isString } from "@thi.ng/checks/is-string";
import type { ICodeGen } from "../api.js";
import { prefixLines } from "./utils.js";

export const ZIG: ICodeGen = {
	doc: (doc, indent, acc, topLevel = false) => {
		acc.push(prefixLines(topLevel ? "//! " : indent + "/// ", doc));
	},

	enum: (e, _, acc) => {
		acc.push(`pub const ${e.name} = enum(${e.tag}) {`);
		for (let v of e.values) {
			let line = `    `;
			if (!isString(v)) {
				v.doc && ZIG.doc(v.doc, "    ", acc);
				line += v.name;
				if (v.value != null) line += ` = ${v.value}`;
			} else {
				line += v;
			}
			acc.push(line + ",");
		}
		acc.push("};\n");
	},

	struct: (struct, _, acc) => {
		acc.push(`pub const ${struct.name} = struct {`);
		for (let f of struct.fields) {
			f.doc && ZIG.doc(f.doc, "    ", acc);
			var line = `    ${f.name}: `;
			switch (f.tag) {
				case "array":
					line += `[${f.len}]${f.type}`;
					break;
				case "slice":
					line += `[]${f.type}`;
					break;
				case "vec":
					line += `@Vector(${f.len}, ${f.type})`;
					break;
				case "ptr":
					line += `*${f.len ? `[${f.len}]` : ""}${f.type}`;
					break;
				case "scalar":
				default:
					line += f.type;
			}
			line += ",";
			acc.push(line);
		}
		acc.push("};\n");
	},
};
