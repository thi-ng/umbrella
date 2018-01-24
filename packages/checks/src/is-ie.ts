export function isIE() {
    return typeof document !== "undefined" &&
        (typeof document["documentMode"] !== "undefined" ||
            navigator.userAgent.indexOf("MSIE") > 0);
}
