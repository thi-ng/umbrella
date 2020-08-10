import {
    every2,
    every3,
    every4,
    not2,
    not3,
    not4,
    some2,
    some3,
    some4,
} from "@thi.ng/vectors";
import { JSBuiltinsBool } from "../api";

export const BVEC2: JSBuiltinsBool = {
    all: every2,
    any: some2,
    not: (v) => not2([], v),
};

export const BVEC3: JSBuiltinsBool = {
    all: every3,
    any: some3,
    not: (v) => not3([], v),
};

export const BVEC4: JSBuiltinsBool = {
    all: every4,
    any: some4,
    not: (v) => not4([], v),
};
