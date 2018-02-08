export function isBlob(x: any): x is Blob {
    return x instanceof Blob;
}
