import { createElement } from "@thi.ng/hdom";

/**
 * Helper function to trigger download of given `src` string as local
 * file with filename `name` and mime `type`. Wraps `src` as blob and
 * creates an object URL for download. By default, the URL auto-expires
 * after 10 seconds to free up memory.
 *
 * @param name
 * @param src
 * @param type
 * @param expire
 */
export function download(
    name: string,
    src: string | Blob,
    type = "image/svg",
    expire = 10000
) {
    const blob = !(src instanceof Blob) ? new Blob([src], { type }) : src;
    const uri = URL.createObjectURL(blob);
    const link = <HTMLLinkElement>createElement(document.body, "a", {
        download: name,
        href: uri
    });
    link.click();
    document.body.removeChild(link);
    if (uri.indexOf("blob:") === 0) {
        setTimeout(() => URL.revokeObjectURL(uri), expire);
    }
}
