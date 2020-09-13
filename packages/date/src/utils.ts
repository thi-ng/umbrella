export const dateParts = (epoch: number) => {
    const d = new Date(epoch);
    return [
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
        d.getUTCHours(),
        d.getUTCMinutes(),
        d.getUTCSeconds(),
    ];
};
