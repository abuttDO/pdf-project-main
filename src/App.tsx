import React from "react";
import "./App.css";
import Router from "./router/routes";
import { BrowserRouter } from "react-router-dom";
// import { ToastProvider } from "./hooks/toast";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* <ToastProvider> */}
      <Router />
      {/* </ToastProvider> */}
    </BrowserRouter>
  );
};

export default App;
