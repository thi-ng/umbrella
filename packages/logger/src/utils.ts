// thing:no-export

/** @internal */
export const expandArgs = (args: any[]) =>
	args.map((x) => (typeof x === "function" ? x() : x));
