export const isNumeric = (x: string) => /^([iu](8|16|32))|(f(32|64))$/.test(x);

export const isBigNumeric = (x: string) => /^[iu]64$/.test(x);

export const isPrim = (x: string) => isNumeric(x) || isBigNumeric(x);

export const prefixLines = (prefix: string, str: string) =>
	str
		.split("\n")
		.map((line) => prefix + line)
		.join("\n");
