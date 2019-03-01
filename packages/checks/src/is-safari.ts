import { isChrome } from "./is-chrome";

export const isSafari = () =>
    typeof navigator !== "undefined" &&
    /Safari/.test(navigator.userAgent) &&
    !isChrome();
