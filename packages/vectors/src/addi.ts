import { defBitOp, defBitOpN } from "./compile/emit";

export const [addI, addI2, addI3, addI4] = defBitOp("+", true);

export const [addU, addU2, addU3, addU4] = defBitOp("+");

export const [addNI, addNI2, addNI3, addNI4] = defBitOpN("+", true);

export const [addNU, addNU2, addNU3, addNU4] = defBitOpN("+");
