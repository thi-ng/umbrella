import { defBitOp, defBitOpN } from "./compile/emit.js";

export const [lshiftI, lshiftI2, lshiftI3, lshiftI4] = defBitOp("<<", true);

export const [lshiftU, lshiftU2, lshiftU3, lshiftU4] = defBitOp("<<");

// prettier-ignore
export const [lshiftNI, lshiftNI2, lshiftNI3, lshiftNI4] = defBitOpN("<<", true);

export const [lshiftNU, lshiftNU2, lshiftNU3, lshiftNU4] = defBitOpN("<<");
