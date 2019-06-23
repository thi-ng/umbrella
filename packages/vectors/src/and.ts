import { defBitOp, defBitOpN } from "./internal/codegen";

export const [andI, andI2, andI3, andI4] = defBitOp("&", true);

export const [andU, andU2, andU3, andU4] = defBitOp("&");

export const [andNI, andNI2, andNI3, andNI4] = defBitOpN("&", true);

export const [andNU, andNU2, andNU3, andNU4] = defBitOpN("&");
