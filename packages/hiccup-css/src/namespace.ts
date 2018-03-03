export function at_namespace(url: string);
export function at_namespace(prefix: string, url: string);
export function at_namespace(...args: string[]) {
    return (acc, _) => {
        if (args.length === 1) {
            acc.push(`@namespace url(${args[0]});`);
        } else {
            acc.push(`@namespace ${args[0]} url(${args[1]});`);
        }
        return acc;
    }
}
