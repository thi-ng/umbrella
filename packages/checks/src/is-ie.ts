export const isIE = () =>
	typeof document !== "undefined" &&
	(typeof (<any>document)["documentMode"] !== "undefined" ||
		navigator.userAgent.indexOf("MSIE") > 0);
