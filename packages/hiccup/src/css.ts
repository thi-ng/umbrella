export const css = (rules: any) => {
    const css = [];
    for (let r in rules) {
        if (rules.hasOwnProperty(r)) {
            css.push(r + ":" + rules[r] + ";");
        }
    }
    return css.join("");
};
