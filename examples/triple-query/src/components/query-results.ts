import { map, mapIndexed, repeat } from "@thi.ng/transducers";
import type { AppContext } from "../api";
import { section } from "./section";
import { table } from "./table";

export const queryResults = (
	_: AppContext,
	title: string,
	results: Set<any>
) => {
	if (results) {
		const [first] = results;
		const keys = Object.keys(first).sort();
		return [
			section,
			title,
			` (${results.size})`,
			[
				table,
				["10%", ...repeat(`${(90 / keys.length) | 0}%`, keys.length)],
				["id", ...keys],
				mapIndexed(
					(i, x) => [i + 1, ...map((k: string) => x[k], keys)],
					results
				),
			],
		];
	}
};
