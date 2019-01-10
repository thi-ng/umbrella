declare var process: any;

export const isNode =
    () => {
        if (typeof process === "object") {
            if (typeof process.versions === "object") {
                if (typeof process.versions.node !== "undefined") {
                    return true;
                }
            }
        }
        return false;
    };
