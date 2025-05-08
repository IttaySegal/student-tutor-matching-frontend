export const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 17) return "Good Afternoon";
    if (currentHour < 20) return "Good Evening";
    return "Good Night";
  };
  