import React from "react";

export default function ActionButton({
  onClick,
  children,
  buttonClass,
  isDisabled = false,
  style = {}
}) {
  return (
    <button
      onClick={onClick}
      className={buttonClass}
      disabled={isDisabled}
      style={style}
    >
      {children}
    </button>
  );
}
