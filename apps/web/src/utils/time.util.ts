const timerAsync = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const wait = async (time: number): Promise<void> => {
  await timerAsync(time);
};

/**
 *
 * @param {Date} previousDate selected date
 * @param {number} expiresIn add seconds to selected date
 * @returns {boolean} If selected date with added seconds has expired?
 */
export const isDateExpired = (previousDate: Date, expiresIn: number): boolean => {
  const now: Date = new Date();
  const prev: Date = previousDate;

  prev.setSeconds(expiresIn);

  return prev.getTime() - now.getTime() <= 0;
};
