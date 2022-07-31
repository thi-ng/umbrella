/**
 * Class decorator. Seals both constructor and prototype.
 *
 * @param constructor - class ctor to seal
 */
export const sealed = (constructor: Function) => {
	Object.seal(constructor);
	Object.seal(constructor.prototype);
};
