import { NULL_LOGGER } from "@thi.ng/logger";
import { expect, test } from "bun:test";
import { expandSpec } from "../src/generate.js";

test("variations", () => {
	expect(
		expandSpec(
			{},
			{
				name: "bw<vid><k>",
				props: "border<var>-width",
				values: [0, 0.5, 1],
				unit: "rem",
				vars: ["", "t", "r", "b", "l"],
			},
			{},
			NULL_LOGGER
		)
	).toEqual({
		bw0: { "border-width": "0rem" },
		bw1: { "border-width": ".5rem" },
		bw2: { "border-width": "1rem" },
		bwb0: { "border-bottom-width": "0rem" },
		bwb1: { "border-bottom-width": ".5rem" },
		bwb2: { "border-bottom-width": "1rem" },
		bwl0: { "border-left-width": "0rem" },
		bwl1: { "border-left-width": ".5rem" },
		bwl2: { "border-left-width": "1rem" },
		bwr0: { "border-right-width": "0rem" },
		bwr1: { "border-right-width": ".5rem" },
		bwr2: { "border-right-width": "1rem" },
		bwt0: { "border-top-width": "0rem" },
		bwt1: { "border-top-width": ".5rem" },
		bwt2: { "border-top-width": "1rem" },
	});
});
