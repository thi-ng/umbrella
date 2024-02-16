import { expect, test } from "bun:test";
import { LogLevel, MemoryLogger, type LogEntry } from "../src/index.js";

const journalWithoutTimestamp = (journal: LogEntry[]) =>
	journal.map((x) => {
		const y = x.slice();
		y.splice(2, 1); // remove timestamp
		return y;
	});

test("memory", () => {
	const logger = new MemoryLogger("test", LogLevel.DEBUG, undefined, 3);
	logger.fine(1, 2, 3);
	logger.debug(1, 2, 3);
	logger.info([1, 2, 3]);
	expect(logger.journal.length).toBe(2);
	logger.warn("abc");
	expect(logger.journal.length).toBe(3);

	expect(journalWithoutTimestamp(logger.journal)).toEqual([
		[LogLevel.DEBUG, "test", 1, 2, 3],
		[LogLevel.INFO, "test", [1, 2, 3]],
		[LogLevel.WARN, "test", "abc"],
	]);

	logger.warn("def");
	expect(logger.journal.length).toBe(3);

	expect(journalWithoutTimestamp(logger.journal)).toEqual([
		[LogLevel.INFO, "test", [1, 2, 3]],
		[LogLevel.WARN, "test", "abc"],
		[LogLevel.WARN, "test", "def"],
	]);
});
