import { expect, test } from "bun:test";
import { deepTransform } from "../src/index.js";

test("transforms hiccup", () => {
	expect(
		deepTransform([
			({ type, meta, title, body }) => [
				"div",
				{ class: type },
				title,
				meta,
				body,
			],
			{
				meta: [
					({ author, date }) => ["div.meta", author, `(${date})`],
					{
						author: ({ email, name }) => [
							"a",
							{ href: `mailto:${email}` },
							name,
						],
						date: (epoch) => new Date(epoch).toISOString(),
					},
				],
				title: (title) => ["h1", title],
			},
		])({
			meta: {
				author: { name: "Alice", email: "a@b.com" },
				date: 1041510896000,
			},
			type: "post",
			title: "Hello world",
			body: "Ratione necessitatibus doloremque itaque.",
		})
	).toEqual([
		"div",
		{ class: "post" },
		["h1", "Hello world"],
		[
			"div.meta",
			["a", { href: "mailto:a@b.com" }, "Alice"],
			"(2003-01-02T12:34:56.000Z)",
		],
		"Ratione necessitatibus doloremque itaque.",
	]);
});
