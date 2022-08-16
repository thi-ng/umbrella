import { isString } from "@thi.ng/checks/is-string";
import type { ICodeGen } from "../api.js";
import { prefixLines } from "./utils.js";

/**
 * Zig code generator options.
 */
export interface ZigOpts {
	/**
	 * If true, generates various struct & struct field analysis functions
	 * (sizes, alignment, offsets etc.).
	 *
	 * @defaultValue false
	 */
	debug: boolean;
}

/**
 * Zig code generator. Call with options and then pass to {@link generateTypes}
 * (see its docs for further usage).
 *
 * @remarks
 * This codegen generates struct and enum definitions for a {@link TypeColl}
 * given to {@link generateTypes}.
 *
 * @param opts
 */
export const ZIG = (opts?: Partial<ZigOpts>) => {
	const { debug } = { debug: false, ...opts };
	const gen: ICodeGen = {
		doc: (doc, indent, acc, topLevel = false) => {
			acc.push(prefixLines(topLevel ? "//! " : indent + "/// ", doc));
		},

		enum: (e, _, acc) => {
			acc.push(`pub const ${e.name} = enum(${e.tag}) {`);
			for (let v of e.values) {
				let line = `    `;
				if (!isString(v)) {
					v.doc && gen.doc(v.doc, "    ", acc);
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
			const name = struct.name;
			acc.push(`pub const ${name} = struct {`);
			const ftypes: Record<string, string> = {};
			for (let f of struct.fields) {
				f.doc && gen.doc(f.doc, "    ", acc);
				var ftype: string;
				switch (f.tag) {
					case "array":
						ftype = `[${f.len}]${f.type}`;
						break;
					case "slice":
						ftype = `[]${f.type}`;
						break;
					case "vec":
						ftype = `@Vector(${f.len}, ${f.type})`;
						break;
					case "ptr":
						ftype = `*${f.len ? `[${f.len}]` : ""}${f.type}`;
						break;
					case "scalar":
					default:
						ftype = f.type;
				}
				ftypes[f.name] = ftype;
				acc.push(`    ${f.name}: ${ftype},`);
			}
			acc.push("};\n");

			if (!debug) return;

			const fn = (fname: string, body: string) =>
				`export fn ${name}_${fname}() usize { return ${body}; }`;

			acc.push(
				fn("align", `@alignOf(${name})`),
				fn("size", `@sizeOf(${name})`)
			);

			for (let f of struct.fields) {
				acc.push(
					fn(f.name + "_align", `@alignOf(${ftypes[f.name]})`),
					fn(f.name + "_offset", `@offsetOf(${name}, "${f.name}")`),
					fn(f.name + "_size", `@sizeOf(${ftypes[f.name]})`)
				);
			}
			acc.push("");
		},
	};
	return gen;
};
