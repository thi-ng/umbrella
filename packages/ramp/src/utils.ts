// SPDX-License-Identifier: Apache-2.0
// thing:no-export
import { mix } from "@thi.ng/math/mix";
import { map } from "@thi.ng/transducers/map";
import { normRange } from "@thi.ng/transducers/norm-range";
import type { Frame, IReadonlyRamp } from "./api.js";

export const __samples = <T>(
	ramp: IReadonlyRamp<T>,
	n: number,
	start?: number,
	end?: number
) => {
	if (start === undefined || end === undefined) {
		const bounds = ramp.timeBounds();
		start = start ?? bounds[0];
		end = end ?? bounds[1];
	}
	return map((t) => {
		t = mix(start!, end!, t);
		return <Frame<T>>[t, ramp.at(t)];
	}, normRange(n));
};
