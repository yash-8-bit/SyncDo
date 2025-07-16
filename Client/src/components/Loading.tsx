import type { JSX } from "react";


// Loading component
function Loading():JSX.Element {
  return (
    <div className="center loading-container">
      <div className="loader"></div>
    </div>
  );
}

export default Loading;
