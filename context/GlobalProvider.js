import React from "react";
import { AuthProvider } from "./AuthContext";
import { LessonProvider } from "./LessonContext";
import { HomeProvider } from "@context/HomeContext";

const GlobalProvider = ({ children }) => {
  return (
    <AuthProvider>
      <HomeProvider>
        {children}
      </HomeProvider>
    </AuthProvider>
  );
};

export default GlobalProvider;
