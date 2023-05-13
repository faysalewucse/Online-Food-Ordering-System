import React from "react";

export default function PrimaryButton({ text }) {
  return (
    <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
      {text}
    </button>
  );
}
