import { SESSION_STORAGE } from "../constants/storage-constants";

export const storeItem = (storeType, key, value) => {
  switch (storeType) {
    case SESSION_STORAGE:
      sessionStorage.setItem(key, JSON.stringify(value));
      break;
    default:
      localStorage.setItem(key, JSON.stringify(value));
  }
};

export const clearItem = (storeType, key) => {
  switch (storeType) {
    case SESSION_STORAGE:
      sessionStorage.removeItem(key);
      break;
    default:
      localStorage.removeItem(key);
  }
};

export const getItem = (storeType, key) => {
  let result;
  switch (storeType) {
    case SESSION_STORAGE:
      result = sessionStorage.getItem(key);
      break;
    default:
      result = localStorage.getItem(key);
  }
  return result;
};
