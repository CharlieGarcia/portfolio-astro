import { beforeEach, describe, expect, it } from "vitest";

import { getStoredTheme, setTheme, syncTheme, theme, toggleTheme } from "../../src/store/theme";

function createStorage(initialTheme?: string) {
  const values = new Map<string, string>();

  if (initialTheme) {
    values.set("theme", initialTheme);
  }

  return {
    getItem(key: string) {
      return values.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      values.set(key, value);
    },
  };
}

describe("theme store", () => {
  beforeEach(() => {
    theme.set("light");
  });

  it("falls back to light when storage is empty or invalid", () => {
    expect(getStoredTheme()).toBe("light");
    expect(getStoredTheme(createStorage("sepia"))).toBe("light");
  });

  it("syncs the atom from storage", () => {
    syncTheme(createStorage("dark"));

    expect(theme.get()).toBe("dark");
  });

  it("toggles and persists the current theme", () => {
    const storage = createStorage();

    toggleTheme(storage);
    expect(theme.get()).toBe("dark");
    expect(storage.getItem("theme")).toBe("dark");

    toggleTheme(storage);
    expect(theme.get()).toBe("light");
    expect(storage.getItem("theme")).toBe("light");
  });

  it("sets a specific theme and writes it to storage", () => {
    const storage = createStorage();

    setTheme("dark", storage);

    expect(theme.get()).toBe("dark");
    expect(storage.getItem("theme")).toBe("dark");
  });
});
