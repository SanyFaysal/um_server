export const courseWeekDiffDuration = (startDate: string, endDate: string): number => {
  // Parse the start and end dates
  const [startYear, startMonth, startDay,] = startDate.split("-").map(Number);
  const [endYear, endMonth, endDay] = endDate.split("-").map(Number);

  // Convert both dates into milliseconds since Unix epoch
  const startDateMs = Date.UTC(startYear, startMonth - 1, startDay);
  const endDateMs = Date.UTC(endYear, endMonth - 1, endDay);

  // Calculate the difference in milliseconds
  const diffInMs = Math.abs(endDateMs - startDateMs);

  // Convert milliseconds to days
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  const durationInWeek = Math.ceil(diffInDays / 7);

  return durationInWeek;
};


