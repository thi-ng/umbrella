export class WebGLError extends Error {
    constructor(msg?: string) {
        super(`WebGL error ${msg ? ": " + msg : ""}`);
    }
}

export const error = (msg?: string) => {
    throw new WebGLError(msg);
};
