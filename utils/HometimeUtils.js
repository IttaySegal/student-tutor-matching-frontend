export const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "בוקר טוב";
    if (currentHour < 17) return "צהריים טובים";
    if (currentHour < 20) return "ערב טוב";
    return "לילה טוב";
  };
  