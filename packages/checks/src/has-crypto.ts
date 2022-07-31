export const hasCrypto = () =>
	typeof window !== "undefined" && window["crypto"] !== undefined;
