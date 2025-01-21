// SPDX-License-Identifier: Apache-2.0
export const isSet = <T = any>(x: any): x is Set<T> => x instanceof Set;
