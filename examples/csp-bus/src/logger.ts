import { channel } from "@thi.ng/csp";

// app logger component is a simple CSP channel
export const initLogger = async () => {
	const logger = channel<string>();
	logger.write("logger ready...");
	return logger;
};
