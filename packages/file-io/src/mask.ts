/**
 * Replaces `home` (default: `process.env.HOME`) sub-path with given `mask`
 * (default: `~`).
 *
 * @param path
 * @param home
 */
export const maskHomeDir = (
	path: string,
	home = process.env.HOME,
	mask = "~"
) => (home ? path.replace(home, mask) : path);
