import React from "react";
import { Route, Link, useParams, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import PdfReader from "../components/pdf-reader";
import SendMessages from "../pages/SendMessages";
const Router: React.FC = () => {
  const [s, setT] = React.useState(false);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/send-messages" element={<SendMessages />} />
      {/* <Route path="/pdf-reader" element={<PdfReader />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default Router;
