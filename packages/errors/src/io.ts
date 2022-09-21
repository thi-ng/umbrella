import { defError } from "./deferror.js";

export const IOError = defError<any>(() => "IO error");

export const ioerror = (msg?: any): never => {
	throw new IOError(msg);
};

export const FileNotFoundError = defError<any>(() => "File not found");

export const fileNotFound = (path: string): never => {
	throw new FileNotFoundError(path);
};
