import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInPage />} />

          <Route path="sign-up" element={<SignUpPage />} />

          <Route index element={<Navigate to="sign-in" replace />} />
        </Route>

        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />

        <Route
          path="*"
          element={
            <div style={{ padding: 100, textAlign: "center" }}>
              404 Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
