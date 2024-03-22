import { expect, test } from "bun:test";
import {
	escape,
	escapeEntitiesNum,
	unescape,
	unescapeEntities,
} from "../src/index.js";

const SRC = "\ta\nb😎c£\\\x00";

test("escape", () => {
	expect(escape(SRC)).toBe("\\ta\\nb\\U0001f60ec\\u00a3\\\\\\0");
});

test("roundtrip", () => {
	expect(unescape(escape(SRC))).toBe(SRC);
});

test("encodeEntitiesNum", () => {
	expect(escapeEntitiesNum("KK℉Ü&")).toBe("K&#x212a;&#x2109;&#xdc;&amp;");
	expect(unescapeEntities("K&#x212a;&#x2109;&#xdc;&amp;")).toBe("KK℉Ü&");
});
