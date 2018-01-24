import { isChrome } from "./is-chrome";

export function isSafari() {
    return typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !isChrome();
}
