// best practice tip: define event & effect names as consts or enums
// and avoid hardcoded strings for more safety and easier refactoring
// also see pre-defined event handlers & interceptors in @thi.ng/atom:
// https://github.com/thi-ng/umbrella/blob/develop/packages/interceptors/src/api.ts#L14

export const ADD_CITY = "add-city";
export const ADD_COUNTRY = "add-country";
export const SET_SORT = "set-sort";
export const SET_PAGE = "set-page";
export const SET_QUERY_RESULT = "set-result";
export const UPDATE_PAGE = "update-page";
export const UPDATE_UI = "update-ui";
