export const format = (fmt: any[], ...args: any[]) => {
    const acc: any[] = [];
    for (let i = 0, j = 0, n = fmt.length; i < n; i++) {
        const f = fmt[i];
        const t = typeof f;
        acc.push(
            t === "function" ?
                f(args[j++]) :
                t === "object" ?
                    f[args[j++]] :
                    f
        );
    }
    return acc.join("");
};
