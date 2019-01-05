export const juxt =
    <T>(...fns: ((x: T) => any)[]) =>
        (x: T) => {
            let res = [];
            for (let i = 0; i < fns.length; i++) {
                res[i] = fns[i](x);
            }
            return res;
        };
