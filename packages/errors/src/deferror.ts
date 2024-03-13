export interface CustomError extends Error {
	/**
	 * The original message given to the error ctor (prior to applying
	 * prefix/suffix). If none was given this will be an empty string.
	 */
	origMessage: string;
}

/**
 * Defines a custom error type/class which implements the {@link CustomError}
 * interface.
 *
 * @remarks
 * All error types in this package are defined via this function.
 *
 * @param prefix
 * @param suffix
 */
export const defError = <T = string>(
	prefix: (msg?: T) => string,
	suffix: (msg?: T) => string = (msg) => (msg !== undefined ? ": " + msg : "")
) =>
	class extends Error implements CustomError {
		origMessage: string;

		constructor(msg?: T) {
			super(prefix(msg) + suffix(msg));
			this.origMessage = msg !== undefined ? String(msg) : "";
		}
	};
