export const isMobile =
    () =>
        typeof navigator !== "undefined" &&
        /mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent) &&
        !/crios/i.test(navigator.userAgent);
