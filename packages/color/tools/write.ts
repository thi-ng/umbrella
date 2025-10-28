// SPDX-License-Identifier: Apache-2.0
import { writeText } from "@thi.ng/file-io";
import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";

export const writeSVG = (path: string, attribs: any, ...body: any[]) =>
	writeText(path, serialize(svg(attribs, ...body)));
