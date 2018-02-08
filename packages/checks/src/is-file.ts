export function isFile(x: any): x is File {
    return x instanceof File;
}
