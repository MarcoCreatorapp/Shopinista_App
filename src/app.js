import React from "react";

export function App() {
  return (
    <button
      onClick={async () => {
        const response = await fetch("/api/hello");
        const data = await response.json();
        alert("Respuesta del backend: " + data.message);
      }}
    >
      Llamar API
    </button>
  );
}
