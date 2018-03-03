export function at_import(url: string, ...queries: string[]) {
    return (acc, _) => (
        acc.push(
            queries.length ?
                `@import url(${url}) ${queries.join(" ")};` :
                `@import url(${url});`
        ),
        acc
    );
}
