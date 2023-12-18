export const expandArgs = (args: any[]) =>
	args.map((x) => (typeof x === "function" ? x() : x));

export const expandArgsJSON = (args: any[]) =>
	args
		.map((x) => {
			if (typeof x === "function") x = x();
			if (!(typeof x === "string" || typeof x === "number")) {
				x = JSON.stringify(x);
			}
			return x;
		})
		.join(" ");
