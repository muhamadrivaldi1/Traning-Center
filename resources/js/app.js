import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-blue-600">
        Training Center
      </h1>
      <p>Belajar teknologi masa depan.</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
