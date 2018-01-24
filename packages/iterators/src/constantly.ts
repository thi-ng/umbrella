export default function constantly<T>(x: T): (...args: any[]) => T {
    return () => x;
}
