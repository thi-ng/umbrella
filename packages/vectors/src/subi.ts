import { defBitOp, defBitOpN } from "./compile/emit.js";

export const [subI, subI2, subI3, subI4] = defBitOp("-", true);

export const [subU, subU2, subU3, subU4] = defBitOp("-");

export const [subNI, subNI2, subNI3, subNI4] = defBitOpN("-", true);

export const [subNU, subNU2, subNU3, subNU4] = defBitOpN("-");
