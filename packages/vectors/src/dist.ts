import type { DistanceFn } from "./api";
import { distSq, distSq2, distSq3, distSq4 } from "./distsq";

export const dist: DistanceFn = (a, b) => Math.sqrt(distSq(a, b));

export const dist2: DistanceFn = (a, b) => Math.sqrt(distSq2(a, b));

export const dist3: DistanceFn = (a, b) => Math.sqrt(distSq3(a, b));

export const dist4: DistanceFn = (a, b) => Math.sqrt(distSq4(a, b));
