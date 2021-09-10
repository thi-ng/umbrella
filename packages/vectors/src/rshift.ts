import { defBitOp, defBitOpN } from "./compile/emit";

export const [rshiftI, rshiftI2, rshiftI3, rshiftI4] = defBitOp(">>", true);

export const [rshiftU, rshiftU2, rshiftU3, rshiftU4] = defBitOp(">>>");

// prettier-ignore
export const [rshiftNI, rshiftNI2, rshiftNI3, rshiftNI4] = defBitOpN(">>", true);

export const [rshiftNU, rshiftNU2, rshiftNU3, rshiftNU4] = defBitOpN(">>>");
