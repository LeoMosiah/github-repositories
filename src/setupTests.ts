import "@testing-library/jest-dom";

const localStorageMock = (function () {
  let store: Record<string, unknown> = {};
  return {
    getItem: function (key: string) {
      return store[key];
    },
    setItem: function (key: string, value: Record<string, unknown>) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });
