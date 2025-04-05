import React from "react";
import { AuthProvider } from "./AuthContext";
import { LessonProvider } from "./LessonContext";

const GlobalProvider = ({ children }) => {
  return (
    <AuthProvider>
      <LessonProvider>{children}</LessonProvider>
    </AuthProvider>
  );
};

export default GlobalProvider;
