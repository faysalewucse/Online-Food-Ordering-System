import React from "react";

export default function Error({ msg }) {
  return (
    <div className="my-3 text-red-500 text-center">
      <h6>{msg}</h6>
    </div>
  );
}
