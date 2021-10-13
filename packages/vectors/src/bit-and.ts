import { defBitOp, defBitOpN } from "./compile/emit.js";

export const [bitAndI, bitAndI2, bitAndI3, bitAndI4] = defBitOp("&", true);

export const [bitAndU, bitAndU2, bitAndU3, bitAndU4] = defBitOp("&");

export const [bitAndNI, bitAndNI2, bitAndNI3, bitAndNI4] = defBitOpN("&", true);

export const [bitAndNU, bitAndNU2, bitAndNU3, bitAndNU4] = defBitOpN("&");
