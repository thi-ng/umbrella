export const maybeParseInt = (x: string, defaultVal: any = 0, radix = 10) => {
	const n = parseInt(x, radix);
	return isNaN(n) ? defaultVal : n;
};

export const maybeParseFloat = (x: string, defaultVal: any = 0) => {
	const n = parseFloat(x);
	return isNaN(n) ? defaultVal : n;
};
