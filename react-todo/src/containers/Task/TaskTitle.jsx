import React from "react";

export default function TaskTitle({
  title,
  isEditEnabled,
  onTitleChanged
}) {
  const onChange = ev => onTitleChanged(ev.target.value);

  if(isEditEnabled) {
    return (
      <div className="taskTitle">
        <input
          type="text"
          value={title}
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <div className="taskTitle">{title}</div>
  );
}
