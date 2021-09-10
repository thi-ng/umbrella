import { defBitOp, defBitOpN } from "./compile/emit";

export const [mulI, mulI2, mulI3, mulI4] = defBitOp("*", true);

export const [mulU, mulU2, mulU3, mulU4] = defBitOp("*");

export const [mulNI, mulNI2, mulNI3, mulNI4] = defBitOpN("*", true);

export const [mulNU, mulNU2, mulNU3, mulNU4] = defBitOpN("*");
