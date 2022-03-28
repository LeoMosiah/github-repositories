import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "./useLocalStorage";

const testKey = "testKey";
const testValue = "testValue";

describe("useLocalStorage", function () {
  it("should return the initial value if no value is saved yet", function () {
    const { result } = renderHook(() => useLocalStorage(testKey, testValue));
    const [getValue] = result.current;
    expect(getValue()).toBe(testValue);
  });

  it("should save the new value on localStorage, and return the saved value", function () {
    const newValue = "newValue";
    const { result } = renderHook(() => useLocalStorage(testKey, testValue));
    const [getValue] = result.current;
    act(() => {
      result.current[1](newValue);
    });
    expect(window.localStorage.getItem(testKey)).toBe(JSON.stringify(newValue));
    expect(getValue()).toBe(newValue);
  });
});
