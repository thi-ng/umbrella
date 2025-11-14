// SPDX-License-Identifier: Apache-2.0
import type { Vec } from "@thi.ng/vectors";

export enum IntersectionType {
	NONE,
	PARALLEL,
	COINCIDENT,
	COINCIDENT_NO_INTERSECT,
	INTERSECT,
	INTERSECT_OUTSIDE,
}

export interface IntersectionResult {
	type: IntersectionType;
	/**
	 * If present, one or more intersection points.
	 */
	isec?: Vec[];
	det?: number;
	alpha?: number;
	beta?: number;
	inside?: boolean;
}

export const NONE: IntersectionResult = Object.freeze({
	type: IntersectionType.NONE,
});
