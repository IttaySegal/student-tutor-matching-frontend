import React from "react";
import { AuthProvider } from "./AuthContext";
import { LessonProvider } from "./LessonContext";
import { HomeProvider } from "@context/HomeContext";

const GlobalProvider = ({ children }) => {
  return (
    <AuthProvider>
       <LessonProvider>
        <HomeProvider>
          {children}
        </HomeProvider>
       </LessonProvider>
    </AuthProvider>
  );
};

export default GlobalProvider;
