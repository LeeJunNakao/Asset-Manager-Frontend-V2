import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "src/views/_public/Register";
import Login from "src/views/_public/Login";
import NotFound from "src/views/NotFound";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
  return <div>Public Routes!</div>;
};

export default PublicRoutes;
