import { renderHook, act } from "@testing-library/react-hooks";
import { getRepositories } from "../services/repository.service";
import { useRepositories } from "./useRepositories";
import { Repository } from "../types/repositories";
import { useLocalStorage } from "./useLocalStorage";

jest.mock("../services/repository.service", () => ({
  getRepositories: jest.fn(),
}));

jest.mock("./useLocalStorage", () => ({
  useLocalStorage: jest.fn(),
}));

const mockedSetLocalStorageValue = jest.fn();

const starredRepository: Repository = {
  id: 2,
  name: "name2",
  language: "TypeScript",
  stargazers_count: 2,
  description: "my typescript repo",
  html_url: "url2",
};

const pythonRepository: Repository = {
  id: 4,
  name: "name4",
  language: "Python",
  stargazers_count: 4,
  description: "my python repo",
  html_url: "url4",
};

export const mockedItems: Repository[] = [
  {
    id: 1,
    name: "name1",
    stargazers_count: 1,
    description: "my unknown language repo",
    html_url: "url1",
  },
  {
    id: 3,
    name: "name3",
    language: "JavaScript",
    stargazers_count: 3,
    description: "my javascript repo",
    html_url: "url3",
  },
  starredRepository,
  pythonRepository,
];

const localStorageKey = "starredRepositories";

export const mockedStarredRepositories = { [starredRepository.id]: true };

const mockedResponse = {
  items: mockedItems,
  total_count: mockedItems.length,
};

describe("useRepositories", () => {
  beforeEach(() => {
    (getRepositories as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockedResponse)
    );
    (useLocalStorage as jest.Mock).mockImplementation(() => [
      mockedStarredRepositories,
      jest.fn(),
    ]);
    jest.clearAllMocks();
  });
  it("should, in the first iteration, fetch repositories for the first page", () => {
    renderHook(() => useRepositories());
    expect(getRepositories).toHaveBeenCalledTimes(1);
  });

  it("should fetch repositories for a specific page", () => {
    const { result } = renderHook(() => useRepositories());
    const page = 2;
    act(() => {
      result.current.setPage(2);
    });
    expect(getRepositories).toHaveBeenCalledWith(page);
  });

  it("should fetch filtered by language", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRepositories());
    await waitForNextUpdate();
    act(() => {
      result.current.setLanguage(pythonRepository.language as string);
    });
    expect(result.current.items).toEqual([pythonRepository]);
  });

  it("should filter results by starred repositories", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRepositories());
    await waitForNextUpdate();
    act(() => {
      result.current.setShowStarred(true);
    });
    expect(result.current.items).toEqual([starredRepository]);
  });

  it("should derive language from items as an array of unique strings filtered by undefined languages", async () => {
    const expectedLanguages = ["JavaScript", "TypeScript", "Python"];
    const { result, waitForNextUpdate } = renderHook(() => useRepositories());
    await waitForNextUpdate();
    expect(result.current.languages).toEqual(expectedLanguages);
  });
});
