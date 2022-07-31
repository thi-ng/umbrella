declare var process: any;

export const isNode = () =>
	typeof process === "object" &&
	typeof process.versions === "object" &&
	typeof process.versions.node !== "undefined";
