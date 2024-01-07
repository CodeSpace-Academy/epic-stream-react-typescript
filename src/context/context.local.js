import { BLANK_STORE } from "./local.helpers";

/**
 *
 */
const LOCAL_KEY = "8ee5e78d-d3f5-4e58-b168-68d009e40054";

/**
 * @param {object} state
 */
export const setSavedStore = (state) => {
  window.localStorage.setItem(
    LOCAL_KEY,
    JSON.stringify(state)
  );
};

/**
 * @returns {object}
 */
export const getSavedStore = () => {
  const string = window.localStorage.getItem(LOCAL_KEY);

  if (!string) {
    return BLANK_STORE;
  }

  return JSON.parse(string);
};
