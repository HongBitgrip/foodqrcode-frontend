import React from "react";

export function ErrorMessage({ error = null }) {
  return <p className="text-danger">{error}</p>;
}
