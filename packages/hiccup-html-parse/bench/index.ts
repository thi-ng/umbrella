import { suite } from "@thi.ng/bench";
import { parseHtml } from "@thi.ng/hiccup-html-parse";
import { bytes } from "@thi.ng/strings";

(async () => {
	const res = await fetch("https://thi.ng/");
	const src = await res.text();

	console.log("result:", parseHtml(src).type);

	suite(
		[
			{
				title: `thi.ng html (${bytes(src.length)})`,
				fn: () => parseHtml(src),
				opts: {},
			},
		],
		{
			iter: 1000,
			warmup: 100,
			size: 1,
		}
	);
})();
