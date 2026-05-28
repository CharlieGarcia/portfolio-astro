import { atom } from "nanostores";

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";

function getStorage(storage?: Pick<Storage, "getItem" | "setItem">) {
  if (storage) {
    return storage;
  }

  if (typeof localStorage === "undefined") {
    return undefined;
  }

  return localStorage;
}

export function getStoredTheme(
  storage?: Pick<Storage, "getItem" | "setItem">
): Theme {
  return getStorage(storage)?.getItem(THEME_STORAGE_KEY) === "dark"
    ? "dark"
    : "light";
}

export const theme = atom<Theme>(getStoredTheme());

export function setTheme(
  nextTheme: Theme,
  storage?: Pick<Storage, "getItem" | "setItem">
) {
  theme.set(nextTheme);
  getStorage(storage)?.setItem(THEME_STORAGE_KEY, nextTheme);
}

export function syncTheme(storage?: Pick<Storage, "getItem" | "setItem">) {
  theme.set(getStoredTheme(storage));
}

export function toggleTheme(storage?: Pick<Storage, "getItem" | "setItem">) {
  setTheme(theme.get() === "light" ? "dark" : "light", storage);
}
