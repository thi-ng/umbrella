import { ConsoleLogger } from "@thi.ng/api";
import { setLogger } from "../src";

/**
 * Default base delay for time based tests
 */
export const TIMEOUT = 50;

export const withLogger = () => setLogger(new ConsoleLogger("rstream"));
