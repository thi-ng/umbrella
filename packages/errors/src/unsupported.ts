import { defError } from "./deferror";

export const UnsupportedOperationError = defError<any>(
    () => "unsupported operation"
);

export const unsupported = (msg?: any): never => {
    throw new UnsupportedOperationError(msg);
};
