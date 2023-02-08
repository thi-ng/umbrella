import { BASE64 } from "@thi.ng/base-n";
import { argb32 } from "@thi.ng/color";
import { FMT_yyyyMMdd_HHmmss } from "@thi.ng/date";
import { mapcat, push, transduce } from "@thi.ng/transducers";
import { writeFileSync } from "fs";
import { THEMES } from "./themes.js";

// flatten all colors into a single byte array
const bytes = new Uint8Array(
	transduce(
		mapcat((palette) =>
			mapcat((x) => {
				const y = argb32(x)[0];
				return [(y >> 16) & 0xff, (y >> 8) & 0xff, y & 0xff];
			}, palette)
		),
		push(),
		THEMES
	)
);

const src = `// thing:no-export
// generated @ ${FMT_yyyyMMdd_HHmmss()} - DO NOT EDIT!
import { BASE64 } from "@thi.ng/base-n/64";

export const NUM_THEMES = ${THEMES.length};

export const BINARY = BASE64.decodeBytes(
	"${BASE64.encodeBytes(bytes)}",
	new Uint8Array(NUM_THEMES * 18)
);`;

writeFileSync("src/binary.ts", src, "utf-8");
