import { ConsoleLogger } from "@thi.ng/logger";
import { LOGGER } from "../src/index.js";

/**
 * Default base delay for time based tests
 */
export const TIMEOUT = 50;

export const withLogger = () => LOGGER.set(new ConsoleLogger("rstream"));
