import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { table, tableKeys } from "../src/index.js"

const result1 = `| **ID** | **Actor** | **Comment** |
|-------:|:---------:|:------------|
|      1 |   Alice   |             |
|    201 |    Bob    | (foe)       |
|   3003 |  Charlie  |             |
|     44 |   Dora    | (recipient) |`;

group("markdown-table", {
    table: () => {
        assert.strictEqual(
            table(
                ["ID", "Actor", "Comment"],
                [
                    [1, "Alice"],
                    [201, "Bob", "(foe)"],
                    [3003, "Charlie", null],
                    [44, "Dora", "(recipient)"],
                ],
                { bold: true, align: ["r", "c", "l"] }
            ),
            result1
        );
    },

    tableKeys: () => {
        assert.strictEqual(
            tableKeys(
                ["ID", "Actor", "Comment"],
                ["id", "name", (x) => x.hint],
                [
                    { id: 1, name: "Alice" },
                    { id: 201, name: "Bob", hint: "(foe)" },
                    { id: 3003, name: "Charlie" },
                    { id: 44, name: "Dora", hint: "(recipient)" },
                ],
                { bold: true, align: ["r", "c", "l"] }
            ),
            result1
        );
    },
});
