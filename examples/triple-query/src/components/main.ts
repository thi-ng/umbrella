// SPDX-License-Identifier: Apache-2.0
import type { AppContext } from "../api.js";
import { queryResults } from "./query-results.js";
import { tripleTable } from "./triple-table.js";

export function main(ctx: AppContext) {
	const triples = tripleTable();
	return () => [
		"div",
		ctx.ui.root,
		[
			triples,
			ctx.views.pagedTriples.deref(),
			ctx.store.triples.length,
			ctx.views.page.deref(),
		],
		[queryResults, "Cities", ctx.views.cities.deref()],
		[queryResults, "Countries", ctx.views.countries.deref()],
	];
}
