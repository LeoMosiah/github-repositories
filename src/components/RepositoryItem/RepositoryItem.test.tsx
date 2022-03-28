import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Repository } from "../../types/repositories";
import { RepositoryItem } from "./RepositoryItem";

const name = "test-name";
const description = "test-description";
const language = "test-language";
const stargazers_count = 1;

const mockedItem: Repository = {
  id: 1,
  name,
  description,
  language,
  html_url: "html_url",
  stargazers_count,
};

describe("RepositoryItem", () => {
  beforeEach(() => {
    window.localStorage.setItem("starredRepositories", JSON.stringify([]));
  });
  it("should render name, github link, description, and number of stars", () => {
    const { getByText } = render(<RepositoryItem item={mockedItem} />);
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(description)).toBeInTheDocument();
    expect(getByText(language)).toBeInTheDocument();
    expect(getByText(stargazers_count)).toBeInTheDocument();
  });

  it("should start a repository item if item is no already starred", () => {
    const { getByRole } = render(<RepositoryItem item={mockedItem} />);
    const starButton = getByRole("button");
    fireEvent.click(starButton);
    const localStorageStarredRepository = window.localStorage.getItem(
      "starredRepositories"
    );
    const expectedLocalStorageValue = JSON.stringify([mockedItem.id]);
    expect(localStorageStarredRepository).toEqual(expectedLocalStorageValue);
  });

  it("shoulds unstart a repository item if item is already starred", () => {
    window.localStorage.setItem(
      "starredRepositories",
      JSON.stringify([mockedItem.id])
    );
    const { getByRole } = render(<RepositoryItem item={mockedItem} />);
    const starButton = getByRole("button");
    fireEvent.click(starButton);
    const localStorageStarredRepository = window.localStorage.getItem(
      "starredRepositories"
    );
    const expectedLocalStorageValue = JSON.stringify([]);
    expect(localStorageStarredRepository).toEqual(expectedLocalStorageValue);
  });
});
