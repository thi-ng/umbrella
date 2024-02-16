import { ALogger } from "@thi.ng/logger/alogger";
import { LogLevel, type ILogger, type LogEntry } from "@thi.ng/logger/api";
import { Stream, type ISubscriber, CloseMode } from "@thi.ng/rstream";

export class Logger extends ALogger implements ISubscriber<LogEntry> {
	stream: Stream<LogEntry>;

	constructor(id: string, level?: LogLevel, parent?: ILogger) {
		super(id, level, parent);
		this.stream = new Stream<LogEntry>({
			id: this.id,
			closeOut: CloseMode.NEVER,
		});
	}

	next(x: LogEntry) {
		x[0] >= this.level && this.stream.next(x);
	}

	done() {
		this.stream.done();
	}

	error(e: Error) {
		return this.stream.error(e);
	}

	logEntry(e: LogEntry): void {
		if (this.level <= e[0]) this.stream.next(e);
	}

	childLogger(id: string, level?: LogLevel): ILogger {
		return new Logger(id, level ?? this.level, this.parent);
	}
}
