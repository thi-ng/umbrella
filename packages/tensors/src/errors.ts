// SPDX-License-Identifier: Apache-2.0
import type { NumericArray } from "@thi.ng/api";
import { defError } from "@thi.ng/errors/deferror";

export const IllegalShapeError = defError<NumericArray>(() => "illegal shape");

export const illegalShape = (shape: NumericArray) => {
	throw new IllegalShapeError(shape);
};
