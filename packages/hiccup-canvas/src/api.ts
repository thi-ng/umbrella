// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf } from "@thi.ng/api";

export interface DrawState {
	attribs: IObjectOf<any>;
	grads?: IObjectOf<CanvasGradient>;
	edits: string[];
	restore?: boolean;
}
