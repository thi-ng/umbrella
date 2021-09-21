import { defBitOp, defBitOpN } from "./compile/emit";

export const [bitXorI, bitXorI2, bitXorI3, bitXorI4] = defBitOp("^", true);

export const [bitXorU, bitXorU2, bitXorU3, bitXorU4] = defBitOp("^");

export const [bitXorNI, bitXorNI2, bitXorNI3, bitXorNI4] = defBitOpN("^", true);

export const [bitXorNU, bitXorNU2, bitXorNU3, bitXorNU4] = defBitOpN("^");
