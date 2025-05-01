// SPDX-License-Identifier: Apache-2.0
import type { NumericArray } from "@thi.ng/api";
import { defError } from "@thi.ng/errors/deferror";
import { equals } from "@thi.ng/vectors/equals";
import type { ITensor } from "./api.js";

export const IllegalShapeError = defError<NumericArray>(() => "illegal shape");

export const illegalShape = (shape: NumericArray) => {
	throw new IllegalShapeError(shape);
};

export const ensureShape = (t: ITensor<any>, shape: number[]) =>
	!equals(t.shape, shape) && illegalShape(t.shape);
