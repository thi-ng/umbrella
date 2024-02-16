import { ALogger } from "@thi.ng/logger/alogger";
import {
	LogLevel,
	type ILogger,
	type LogEntry,
	type LogLevelName,
} from "@thi.ng/logger/api";
import { CloseMode, Stream, type ISubscriber } from "@thi.ng/rstream";

export class Logger extends ALogger implements ISubscriber<LogEntry> {
	stream: Stream<LogEntry>;

	constructor(id: string, level?: LogLevel | LogLevelName, parent?: ILogger) {
		super(id, level, parent);
		this.stream = new Stream<LogEntry>({
			id: this.id,
			closeOut: CloseMode.NEVER,
		});
	}

	next(x: LogEntry) {
		this.logEntry(x);
	}

	done() {
		this.stream.done();
	}

	error(e: Error) {
		return this.stream.error(e);
	}

	logEntry(e: LogEntry): void {
		if (e[0] >= this.level) {
			this.stream.next(e);
			this.parent && this.parent.logEntry(e);
		}
	}

	childLogger(id: string, level?: LogLevel): Logger {
		return new Logger(id, level ?? this.level, this);
	}
}
