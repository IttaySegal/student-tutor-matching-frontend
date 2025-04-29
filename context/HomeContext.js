// context/HomeContext.jsx
import { createContext, useContext, useState } from "react";
import { getAggregateHomeData } from "@services/homeService";

const HomeContext = createContext();
export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [homeStats, setHomeStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHomeStats = async (accessToken) => {
    try {
      setLoading(true);
      const data = await getAggregateHomeData(accessToken);
      setHomeStats(data);
    } catch (err) {
      console.error("Failed to fetch home stats", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <HomeContext.Provider
      value={{ homeStats, loading, error, fetchHomeStats, clearError }}
    >
      {children}
    </HomeContext.Provider>
  );
};
