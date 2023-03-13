import React from "react";

export default function Button1({ text, loading, onClickHandler }) {
  return (
    <button
      onClick={onClickHandler}
      className="bg-green text-white py-2 px-4 rounded hover:bg-greenHover"
    >
      {loading && (
        <div
          className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
      {text}
    </button>
  );
}
