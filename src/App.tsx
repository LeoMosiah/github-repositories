import React from "react";
import "./App.css";
import { Repository } from "./types/repositories";
import { RepositoryItem } from "./components/RepositoryItem/RepositoryItem";
import { useRepositories } from "./hooks/useRepositories";
import { Switch } from "./components/Switch";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const {
    items,
    totalCount,
    page,
    pages,
    setPage,
    setLanguage,
    showStarred,
    setShowStarred,
    loading,
    languages,
    error,
    refetch,
  } = useRepositories();
  return (
    <div>
      <div className="row__centered">
        <h1>Showing {totalCount} available repository results</h1>
      </div>
      <div className="row__centered">
        <Switch
          label="Starred"
          value={showStarred}
          onChange={() => setShowStarred(!showStarred)}
        />
        <select onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Language</option>
          {languages.map((language) => (
            <option key={language}>{language}</option>
          ))}
        </select>
      </div>
      {loading && <p>Loading...</p>}
      {error && <button onClick={refetch}>Retry</button>}
      <div className="row__centered">
        <ul className="repositories__list">
          {items.map(renderRepositoryItem)}
        </ul>
      </div>
      <div className="row__centered">
        {page > 1 && (
          <button onClick={() => setPage(page - 1)}>Previous</button>
        )}
        {page < pages && (
          <button onClick={() => setPage(page + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}

function renderRepositoryItem(item: Repository): React.ReactElement {
  return <RepositoryItem key={item.id} item={item} />;
}

export default App;
