import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "./App";
import { getRepositories } from "./services/repository.service";
import {
  mockedItems,
  mockedStarredRepositories,
} from "./hooks/useRepositories.test";
import { useLocalStorage } from "./hooks/useLocalStorage";

jest.mock("./services/repository.service", () => ({
  getRepositories: jest.fn(),
}));

jest.mock("./hooks/useLocalStorage", () => ({
  useLocalStorage: jest.fn(),
}));

const mockedResponse = {
  items: mockedItems,
  total_count: mockedItems.length,
};

describe("App", () => {
  beforeEach(() => {
    (getRepositories as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockedResponse)
    );
    (useLocalStorage as jest.Mock).mockImplementation(() => [
      () => mockedStarredRepositories,
      jest.fn(),
    ]);
    jest.clearAllMocks();
  });
  it("should render repositories list, and total number of repositories", async () => {
    const { getByText } = render(<App />);
    const numberOfRepositoriesBanner = `Showing ${mockedResponse.total_count} available repository results`;
    await waitFor(() => {
      expect(getByText(numberOfRepositoriesBanner)).toBeInTheDocument();
      mockedResponse.items.forEach((item) => {
        expect(getByText(item.name)).toBeInTheDocument();
        expect(getByText(item.stargazers_count)).toBeInTheDocument();
      });
    });
  });

  it("should render error message when there is an error", async () => {
    (getRepositories as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error("Error"))
    );
    const { getByText } = render(<App />);
    const errorMessage = "Retry";
    await waitFor(() => {
      expect(getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("should render loading message when loading", async () => {
    (getRepositories as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        items: [],
        total_count: 0,
      })
    );
    const { getByText } = render(<App />);
    const loadingMessage = "Loading...";
    await waitFor(() => {
      expect(getByText(loadingMessage)).toBeInTheDocument();
    });
  });

  it("should not render next button if it is on the last page", () => {
    const { queryByText } = render(<App />);
    const nextButton = "Next";
    expect(queryByText(nextButton)).toBeNull();
  });

  it("should not render previous button if it is on the first page", () => {
    const { queryByText } = render(<App />);
    const previousButton = "Previous";
    expect(queryByText(previousButton)).toBeNull();
  });
});
