import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import PaymentsPage from "./pages/PaymentsPage/PayementsPage";

const PageRouter = () => {
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<HomePage />} />

        {/* Calendar Page Route */}
        <Route path="/calendar" element={<CalendarPage />} />

        {/* Payments Page Route */}
        <Route path="/payments" element={<PaymentsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRouter;