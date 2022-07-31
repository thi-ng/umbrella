export const isMobile = () =>
	typeof navigator !== "undefined" &&
	/mobile|tablet|ip(ad|hone|od)|android|silk|crios/i.test(
		navigator.userAgent
	);
