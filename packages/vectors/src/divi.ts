import { defBitOp, defBitOpN } from "./compile/emit.js";

export const [divI, divI2, divI3, divI4] = defBitOp("/", true);

export const [divU, divU2, divU3, divU4] = defBitOp("/");

export const [divNI, divNI2, divNI3, divNI4] = defBitOpN("/", true);

export const [divNU, divNU2, divNU3, divNU4] = defBitOpN("/");
