// /Users/spr/aiseo/aiseo/utils/dateUtils.ts

/**
 * Converts a day number (1-28) from a 4-week plan into a formatted date string.
 * It calculates the date relative to the current date.
 * @param dayNumber - The day number from the AI-generated plan (1-28).
 * @returns A formatted date string in 'YYYY-MM-DD' format.
 */
export const mapDayToDate = (dayNumber: number): string => {
  if (dayNumber < 1 || dayNumber > 28) {
    // Fallback for safety, though the AI schema should prevent this.
    // Returns today's date.
    return new Date().toISOString().split('T')[0];
  }

  const today = new Date();
  const targetDate = new Date(today);
  // Adjust date by adding the difference in days. Day 1 is today.
  targetDate.setDate(today.getDate() + dayNumber - 1); 

  return targetDate.toISOString().split('T')[0];
};
