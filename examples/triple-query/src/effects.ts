// SPDX-License-Identifier: Apache-2.0
// best practice tip: define event & effect names as consts or enums
// and avoid hardcoded strings for more safety and easier refactoring
// also see pre-defined event handlers & interceptors in @thi.ng/atom:
// https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/interceptors/src/api.ts#L31

export const ADD_TRIPLE = "add-triples";
export const REMOVE_TRIPLE = "remove-triples";
