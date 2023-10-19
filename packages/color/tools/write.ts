import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";
import { writeFileSync } from "fs";

export const writeSVG = (path: string, attribs: any, ...body: any[]) =>
	writeFileSync(path, serialize(svg(attribs, ...body)), "utf-8");
