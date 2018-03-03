export function at_import(url: string, ...queries: string[]) {
    return (acc, _) => {
        if (queries.length === 0) {
            acc.push(`@import url(${url});`);
        } else {
            acc.push(`@import url(${url}) ${queries.join(" ")};`);
        }
        return acc;
    }
}
