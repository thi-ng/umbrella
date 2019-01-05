export const shuffle =
    <T>(items: T[]) => {
        let n = items.length;
        if (n > 1) {
            while (n > 0) {
                const i = (Math.random() * n) | 0;
                n--;
                const t = items[i];
                items[i] = items[n];
                items[n] = t;
            }
        }
        return items;
    };
