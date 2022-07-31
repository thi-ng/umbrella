export const isChrome = () =>
	typeof window !== "undefined" && !!(<any>window)["chrome"];
