import React from "react";
import "./RepositoryItem.css";
import { Repository } from "../../types/repositories";

type Props = {
  item: Repository;
  isStarred?: boolean;
  onStar: (repositoryId: number) => void;
};

export const RepositoryItem: React.FC<Props> = (props: Props) => {
  const { item, onStar, isStarred = false } = props;

  return (
    <li className="list__item">
      <a
        className="list__item--name"
        href={item.html_url}
        target="_blank"
        rel="noreferrer"
      >
        {item.name}
      </a>
      <span className="list__item--description">{item.description}</span>
      <div>
        <button className="list__item--button" onClick={() => onStar(item.id)}>
          {renderIcon(isStarred)}
        </button>
        <span className="list__item--language">{item.stargazers_count}</span>
        <span className="list__item--language">{item.language}</span>
      </div>
    </li>
  );
};

const renderIcon = (isStarred: boolean): JSX.Element => {
  if (isStarred) {
    return (
      <svg
        aria-hidden="true"
        height="16"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        data-view-component="true"
      >
        <path
          fillRule="evenodd"
          d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"
        />
      </svg>
    );
  }
  return (
    <svg
      aria-label="star"
      role="img"
      height="16"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      data-view-component="true"
      className="octicon octicon-star"
    >
      <path
        fillRule="evenodd"
        d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
      />
    </svg>
  );
};
