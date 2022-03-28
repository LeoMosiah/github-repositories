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
    const { getByText } = render(
      <RepositoryItem item={mockedItem} onStar={jest.fn()} />
    );
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(description)).toBeInTheDocument();
    expect(getByText(language)).toBeInTheDocument();
    expect(getByText(stargazers_count)).toBeInTheDocument();
  });
});
