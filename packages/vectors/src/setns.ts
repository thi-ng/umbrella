// SPDX-License-Identifier: Apache-2.0
import type { VecOpSGN, VecOpSN } from "./api.js";
import { defOpS } from "./compile/emit.js";
import { NEW_OUT, SET_N } from "./compile/templates.js";

export const [setNS, setNS2, setNS3, setNS4] = defOpS<VecOpSGN, VecOpSN>(
	SET_N,
	"o,n",
	"io=0,so=1",
	"o",
	"o",
	NEW_OUT
);
