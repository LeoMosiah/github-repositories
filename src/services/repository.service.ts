import { client } from "./client";
import { Repository } from "../types/repositories";

export const getRepositories = async (
  page = 1
): Promise<{ items: Repository[]; total_count: number }> => {
  const perPage = 30;
  const date = getLastWeek();
  const baseUrl = `search/repositories?q=created:%3E${date}&sort=stars&order=desc&type=Repositories`;
  const urlWithQueryParams = `${baseUrl}&page=${page}&per_page=${perPage}`;
  return client(urlWithQueryParams);
};

const getLastWeek = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split("T")[0];
};
