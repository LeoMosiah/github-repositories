import React, { ChangeEvent } from "react";
import "./index.css";

type Props = {
  onChange: (event: ChangeEvent) => void;
  value: boolean;
  label: string;
};

export const Switch: React.FC<Props> = (props: Props) => {
  const { onChange, value, label } = props;
  return (
    <label className="toggle">
      <input
        className="toggle-checkbox"
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      <div className="toggle-switch" />
      <span className="slider">{label}</span>
    </label>
  );
};
