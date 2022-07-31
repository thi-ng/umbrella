export const isFirefox = () =>
	typeof window !== "undefined" && !!(<any>window)["InstallTrigger"];
