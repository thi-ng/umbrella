// SPDX-License-Identifier: Apache-2.0
import { defError } from "./deferror.js";

export const UnsupportedOperationError = defError<any>(
	() => "unsupported operation"
);

/**
 * Throws {@link UnsupportedOperationError} error.
 *
 * @param msg
 */
export const unsupportedOp = (msg?: any): never => {
	throw new UnsupportedOperationError(msg);
};

/**
 * @deprecated use {@link unsupportedOp}
 */
export const unsupported = unsupportedOp;

export const UnsupportedFeatureError = defError<any>(
	() => "unsupported feature"
);

/**
 * Throws {@link UnsupportedFeatureError} error.
 *
 * @param msg
 */
export const unsupportedFeature = (msg?: any): never => {
	throw new UnsupportedFeatureError(msg);
};
