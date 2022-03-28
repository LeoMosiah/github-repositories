import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "./useLocalStorage";
import { useStarRepository } from "./useStarRepository";
import { Repository } from "../types/repositories";

jest.mock("./useLocalStorage", () => ({
  useLocalStorage: jest.fn(),
}));

const mockedSetLocalStorageValue = jest.fn();

const mockedRepository: Repository = {
  id: 1,
  name: "name",
  html_url: "url",
  description: "description",
  stargazers_count: 1,
};

describe("useStarRepository", () => {
  it("should save the repository id on localstorage if repository  was not already starred", () => {
    (useLocalStorage as jest.Mock).mockImplementation(() => [
      [],
      mockedSetLocalStorageValue,
    ]);
    const { result } = renderHook(() => useStarRepository(mockedRepository.id));
    act(() => {
      const [, setRepository] = result.current;
      setRepository();
    });
    expect(mockedSetLocalStorageValue).toHaveBeenCalledWith([
      mockedRepository.id,
    ]);
  });

  it("should remove the repository id on localstorage if repository is already starred", () => {
    (useLocalStorage as jest.Mock).mockImplementation(() => [
      [mockedRepository.id],
      mockedSetLocalStorageValue,
    ]);
    const { result } = renderHook(() => useStarRepository(mockedRepository.id));
    act(() => {
      const [, setRepository] = result.current;
      setRepository();
    });
    expect(mockedSetLocalStorageValue).toHaveBeenCalledWith([]);
  });
});
