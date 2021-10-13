import { defBitOp, defBitOpN } from "./compile/emit.js";

export const [bitOrI, bitOrI2, bitOrI3, bitOrI4] = defBitOp("|", true);

export const [bitOrU, bitOrU2, bitOrU3, bitOrU4] = defBitOp("|");

export const [bitOrNI, bitOrNI2, bitOrNI3, bitOrNI4] = defBitOpN("|", true);

export const [bitOrNU, bitOrNU2, bitOrNU3, bitOrNU4] = defBitOpN("|");
