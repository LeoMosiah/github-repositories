import React, { useEffect, useState, useCallback } from "react";
import { Repository } from "../types/repositories";
import { getRepositories } from "../services/repository.service";
import { useLocalStorage } from "./useLocalStorage";

type UseRepositories = {
  items: Repository[];
  totalCount: number;
  setLanguage: (language: string) => void;
  page: number;
  pages: number;
  setPage: (page: number) => void;
  showStarred: boolean;
  setShowStarred: (showStarred: boolean) => void;
  loading: boolean;
  error: boolean;
  refetch: () => void;
  languages: string[];
};

export function useRepositories(): UseRepositories {
  const [getStarredRepositories] = useLocalStorage<number[]>(
    "starredRepositories",
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<
    undefined | { items: Repository[]; total_count: number }
  >();
  const [page, setPage] = React.useState<number>(1);
  const [showStarred, setShowStarred] = React.useState<boolean>(false);
  const [language, setLanguage] = useState<string>("");

  const fetchRepositories = useCallback(async () => {
    try {
      setLoading(true);
      const { items, total_count } = await getRepositories(page);
      setError(false);
      setData({ items, total_count });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  const starredRepositories = getStarredRepositories();

  const byLanguage = (item: Repository): boolean => {
    if (!language) {
      return true;
    }
    return item.language === language;
  };

  const byStarred = (item: Repository): boolean => {
    if (!showStarred) {
      return true;
    }
    return starredRepositories.includes(item.id);
  };

  const items: Repository[] = data?.items || [];
  const totalCount = data?.total_count || 0;
  const pages = Math.ceil(totalCount / 30);
  const languages: string[] = items
    .map((item) => item.language || "")
    .filter((item) => item)
    .filter((item, index, array) => array.indexOf(item) === index);

  return {
    items: items.filter(byStarred).filter(byLanguage),
    totalCount,
    setLanguage,
    page,
    pages,
    setPage,
    showStarred,
    setShowStarred,
    loading,
    error,
    languages,
    refetch: fetchRepositories,
  };
}
