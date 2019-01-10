/**
 * Class decorator. Seals both constructor and prototype.
 *
 * @param constructor
 */
export const sealed =
    (constructor: Function) => {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    };
