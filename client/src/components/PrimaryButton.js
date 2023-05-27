import React from "react";

export default function PrimaryButton({ text, extraStyle, onClickHandler }) {
  return (
    <div
      onClick={onClickHandler}
      className={`p-2 text-center block bg-gradient-to-tr from-primaryHover to-primary hover:shadow-lg transition-all duration-300 rounded hover:bg-greenHover text-white ${extraStyle}`}
    >
      {text}
    </div>
  );
}
