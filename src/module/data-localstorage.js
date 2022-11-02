/* eslint-disable class-methods-use-this */
export default class localStorageList {
  git(key) {
    return localStorage.getItem(key);
  }

  sit(key, val) {
    localStorage.setItem(key, val);
  }
}