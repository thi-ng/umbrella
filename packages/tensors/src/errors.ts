// SPDX-License-Identifier: Apache-2.0
import { defError } from "@thi.ng/errors/deferror";

export const IllegalShapeError = defError<number[]>(() => "illegal shape");

export const illegalShape = (shape: number[]) => {
	throw new IllegalShapeError(shape);
};
