import { vop } from "@thi.ng/vectors/vop";
import type { MultiMatOp1 } from "./api.js";
import { IDENT22, IDENT23, IDENT33, IDENT44 } from "./constants.js";
import { set } from "./set.js";

/**
 * Writes identity matrix into given matrix.
 */
export const identity: MultiMatOp1 = vop();

export const identity22 = identity.add(4, (m) => set(m, IDENT22));

export const identity23 = identity.add(6, (m) => set(m, IDENT23));

export const identity33 = identity.add(9, (m) => set(m, IDENT33));

export const identity44 = identity.add(16, (m) => set(m, IDENT44));
