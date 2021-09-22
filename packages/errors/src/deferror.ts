export const defError = <T = string>(
    prefix: (msg?: T) => string,
    suffix: (msg?: T) => string = (msg) => (msg !== undefined ? ": " + msg : "")
) =>
    class extends Error {
        constructor(msg?: T) {
            super(prefix(msg) + suffix(msg));
        }
    };
