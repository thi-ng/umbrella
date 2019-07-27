import { createElement } from "@thi.ng/hdom";

export function download(filename: string, text: string) {
    const link = <HTMLLinkElement>createElement(document.body, "a", {
        href: "data:text/plain;charset=utf-8," + encodeURIComponent(text),
        download: filename,
        style: { display: "none" }
    });
    link.click();
    document.body.removeChild(link);
}
