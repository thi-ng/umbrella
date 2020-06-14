import { assert } from "../assert";

/**
 * Method property decorator factory. Augments original method with
 * deprecation message (via console), shown when method is invoked.
 * Accepts optional message arg. Throws error if assigned property
 * is not a function.
 *
 * @param msg - deprecation message
 */
export const deprecated = (msg?: string, log = console.log): MethodDecorator =>
    function (
        target: any,
        prop: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const signature = `${target.constructor.name}#${prop.toString()}`;
        const fn = descriptor.value;
        assert(typeof fn === "function", `${signature} is not a function`);
        descriptor.value = function () {
            log(`DEPRECATED ${signature}: ${msg || "will be removed soon"}`);
            return fn.apply(this, arguments);
        };
        return descriptor;
    };
