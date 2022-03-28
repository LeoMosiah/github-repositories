import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

type UseStarRepository = [boolean, () => void];

export function useStarRepository(id: number): UseStarRepository {
  const [starredRepositories, setStarredRepositories] = useLocalStorage<
    number[]
  >("starredRepositories", []);
  const starred = starredRepositories.includes(id);

  const onStar = (): void => {
    if (starred) {
      setStarredRepositories(
        starredRepositories.filter((repoId) => repoId !== id)
      );
    } else {
      setStarredRepositories(starredRepositories.concat(id));
    }
  };

  return [starred, onStar];
}
