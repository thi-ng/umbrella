export const ensureArgs =
    (args: any[]) =>
        typeof args[0] === "number" ?
            args.length < 4 ?
                (args.push(1), args) :
                args :
            args[0];
