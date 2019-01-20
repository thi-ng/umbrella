import { AttribPool } from "../src/attrib-pool";
import { Type } from "@thi.ng/malloc";
// import * as assert from "assert";

describe("vector-pools", () => {
    it("attribs", () => {
        const pool = new AttribPool(
            0x100,
            8,
            {
                pos: { type: Type.F32, default: [0, 0], size: 2, byteOffset: 0 },
                id: { type: Type.U32, default: 0, size: 1, byteOffset: 8 },
                index: { type: Type.U16, default: 0, size: 1, byteOffset: 12 },
                col: { type: Type.I8, default: [0, 0, 0, 0], size: 4, byteOffset: 14 },
            }
        );
        pool.setAttribValue("pos", 0, [1, 2]);
        pool.setAttribValue("id", 0, 1);
        pool.setAttribValue("index", 0, 10);
        pool.setAttribValue("col", 0, [128, 129, 130, 131]);
        pool.setAttribValue("pos", 1, [3, 4]);
        pool.setAttribValue("id", 1, 2);
        pool.setAttribValue("index", 1, 20);
        pool.setAttribValue("col", 1, [255, 254, 253, 252]);
    });
});
