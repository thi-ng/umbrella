import { defError } from "./deferror.js";

export const IllegalArgumentError = defError<any>(() => "illegal argument(s)");

export const illegalArgs = (msg?: any): never => {
	throw new IllegalArgumentError(msg);
};
