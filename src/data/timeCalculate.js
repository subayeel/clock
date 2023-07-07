export const getTimeByTimezoneOffset = (timezoneOffset) => {
    const currentTime = new Date();
    const offsetMilliseconds = timezoneOffset * 60 * 1000;
    const cityTime = new Date(currentTime.getTime() + offsetMilliseconds);
    return cityTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };