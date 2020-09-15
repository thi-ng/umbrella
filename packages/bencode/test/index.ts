import { equiv } from "@thi.ng/equiv";
import * as assert from "assert";
import { decode, encode } from "../src/index";

const src = { foo: [1, "a", { bar: "baz" }, [42.123]] };
const src2 = { foo: new Uint8Array([0, 1, 2, 3, 255, 254, 253]) };

// prettier-ignore
describe("bencode", () => {

    it("roundtrip (utf8)", () => {
        let bytes;
        assert. deepStrictEqual(
            bytes = [...encode(src)],
            [
                0x64, 0x33, 0x3a, 0x66, 0x6f, 0x6f, 0x6c, 0x69, 0x31, 0x65, 0x31, 0x3a, 0x61, 0x64, 0x33, 0x3a,
                0x62, 0x61, 0x72, 0x33, 0x3a, 0x62, 0x61, 0x7a, 0x65, 0x6c, 0x66, 0x34, 0x32, 0x2e, 0x31, 0x32,
                0x33, 0x65, 0x65, 0x65, 0x65,
            ]
        );

        assert. deepStrictEqual(decode(bytes), src);
    });

    it("roundtrip (raw)", () => {
        let bytes;
        assert(
            equiv(
                bytes = encode(src2),
                [0x64, 0x33, 0x3a, 0x66, 0x6f, 0x6f, 0x37, 0x3a, 0x00, 0x01, 0x02, 0x03, 0xff, 0xfe, 0xfd, 0x65]
            )
        )
        assert(equiv(decode(bytes, false), src2));
    });
});
