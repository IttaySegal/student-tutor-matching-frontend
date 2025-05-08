// context/HomeContext.jsx
import { createContext, useContext, useState, useMemo } from "react";
import { getAggregateHomeData } from "@services/homeService";

const HomeContext = createContext();
export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [homeStats, setHomeStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

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

  // Aggregated subject totals (only if admin)
  const aggregatedChartData = useMemo(() => {
    if (homeStats?.role !== "admin") return [];

    const distribution = homeStats.lessonsnsGradeDistribution || [];
    const result = {};

    distribution.forEach(({ subjectName, count }) => {
      result[subjectName] = (result[subjectName] || 0) + count;
    });

    return Object.entries(result).map(([name, count]) => ({ name, count }));
  }, [homeStats]);

  // Grade breakdown for selected subject (only if admin)
  const subjectBreakdown = useMemo(() => {
    if (homeStats?.role !== "admin") return [];

    return homeStats.lessonsnsGradeDistribution?.filter(
      (item) => item.subjectName === selectedSubject
    ) || [];
  }, [selectedSubject, homeStats]);

  return (
    <HomeContext.Provider
      value={{
        homeStats,
        loading,
        error,
        fetchHomeStats,
        clearError,
        // admin-only pie chart drill-down
        aggregatedChartData,
        selectedSubject,
        setSelectedSubject,
        subjectBreakdown,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
