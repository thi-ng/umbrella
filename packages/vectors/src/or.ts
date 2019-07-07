import { defBitOp, defBitOpN } from "./internal/codegen";

export const [orI, orI2, orI3, orI4] = defBitOp("|", true);

export const [orU, orU2, orU3, orU4] = defBitOp("|");

export const [orNI, orNI2, orNI3, orNI4] = defBitOpN("|", true);

export const [orNU, orNU2, orNU3, orNU4] = defBitOpN("|");
