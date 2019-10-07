import { Fn, Fn0, Fn2 } from "./fn";

/**
 * Predicate function mapping given value to true/false.
 */
export type Predicate<T> = Fn<T, boolean>;

/**
 * Predicate function mapping given args to true/false.
 */
export type Predicate2<T> = Fn2<T, T, boolean>;

/**
 * Higher order `Predicate` builder. Possibly stateful.
 */
export type StatefulPredicate<T> = Fn0<Predicate<T>>;

/**
 * Higher order `Predicate2` builder. Possibly stateful.
 */
export type StatefulPredicate2<T> = Fn0<Predicate2<T>>;
