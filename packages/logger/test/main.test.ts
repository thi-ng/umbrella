import * as assert from "assert";
import { LogLevel, MemoryLogger, type LogEntry } from "../src/index.js";

const journalWithoutTimestamp = (journal: LogEntry[]) =>
	journal.map((x) => {
		const y = x.slice();
		y.splice(2, 1); // remove timestamp
		return y;
	});

const logger = new MemoryLogger("test", LogLevel.DEBUG, 3);
logger.fine(1, 2, 3);
logger.debug(1, 2, 3);
logger.info([1, 2, 3]);
assert.strictEqual(logger.journal.length, 2);
logger.warn("abc");
assert.strictEqual(logger.journal.length, 3);

assert.deepEqual(journalWithoutTimestamp(logger.journal), [
	[LogLevel.DEBUG, "test", 1, 2, 3],
	[LogLevel.INFO, "test", [1, 2, 3]],
	[LogLevel.WARN, "test", "abc"],
]);

logger.warn("def");
assert.strictEqual(logger.journal.length, 3);

assert.deepEqual(journalWithoutTimestamp(logger.journal), [
	[LogLevel.INFO, "test", [1, 2, 3]],
	[LogLevel.WARN, "test", "abc"],
	[LogLevel.WARN, "test", "def"],
]);
