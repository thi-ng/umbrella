export const isFirefox = () =>
    typeof window !== "undefined" && !!window["InstallTrigger"];
