import { defError } from "./deferror.js";

export const IllegalStateError = defError<any>(() => "illegal state");

export const illegalState = (msg?: any): never => {
    throw new IllegalStateError(msg);
};
