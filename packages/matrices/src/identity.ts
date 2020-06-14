import { vop } from "@thi.ng/vectors";
import { IDENT22, IDENT23, IDENT33, IDENT44 } from "./constants";
import { set } from "./set";
import type { MultiMatOp1 } from "./api";

/**
 * Writes identity matrix into given matrix.
 */
export const identity: MultiMatOp1 = vop();

export const identity22 = identity.add(4, (m) => set(m, IDENT22));

export const identity23 = identity.add(6, (m) => set(m, IDENT23));

export const identity33 = identity.add(9, (m) => set(m, IDENT33));

export const identity44 = identity.add(16, (m) => set(m, IDENT44));
