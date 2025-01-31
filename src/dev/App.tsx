import React from "react";
import ReactDOM from "react-dom/client";
import { WakeMe } from "../wake-me";

const App = () => {
  return (
    <div>
      {/* 여기에 테스트하고 싶은 컴포넌트를 추가하세요 */}
      <WakeMe />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
