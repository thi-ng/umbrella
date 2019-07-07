import { defBitOp, defBitOpN } from "./internal/codegen";

export const [xorI, xorI2, xorI3, xorI4] = defBitOp("^", true);

export const [xorU, xorU2, xorU3, xorU4] = defBitOp("^");

export const [xorNI, xorNI2, xorNI3, xorNI4] = defBitOpN("^", true);

export const [xorNU, xorNU2, xorNU3, xorNU4] = defBitOpN("^");
