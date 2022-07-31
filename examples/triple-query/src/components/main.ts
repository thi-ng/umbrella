import type { AppContext } from "../api";
import { queryResults } from "./query-results";
import { tripleTable } from "./triple-table";

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
