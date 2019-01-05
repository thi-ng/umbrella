export const isChrome =
    () => typeof window !== "undefined" && !!window["chrome"];
