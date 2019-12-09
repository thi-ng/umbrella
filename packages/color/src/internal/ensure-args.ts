/** @internal */
export const ensureArgs = (args: any[]) => {
    if (typeof args[0] === "number") {
        switch (args.length) {
            case 1:
                return args.push(0, 0, 1), [args];
            case 2:
                return args.push(0, 1), [args];
            case 3:
                return args.push(1), [args];
            default:
                return [args];
        }
    }
    return args;
};
