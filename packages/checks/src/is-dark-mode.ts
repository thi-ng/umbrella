/**
 * Browser only. Returns true if client has currently dark mode enabled. Always
 * returns false if no global `window` object is available.
 */
export const isDarkMode = () =>
	typeof window !== "undefined"
		? window?.matchMedia?.("(prefers-color-scheme:dark)").matches ?? false
		: false;
