// best practice tip: define event & effect names as consts or enums
// and avoid hardcoded strings for more safety and easier refactoring
// also see pre-defined event handlers & interceptors in @thi.ng/atom:
// https://github.com/thi-ng/umbrella/blob/develop/packages/interceptors/src/api.ts#L14

export const JSON = "load-json";
export const ROUTE_TO = "route-to";
