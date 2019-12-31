/**
 * Interface for mutable types supporting internal cleanup (e.g.
 * removing all values in a container etc.).
 *
 * @remarks
 * Also see {@link IEmpty} and {@link IRelease} for related operations.
 */
export interface IClear {
    clear(): void;
}
