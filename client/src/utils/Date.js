export function calculateDate(date) {
  const selectedDate = new Date(date);

  const currentDate = new Date();

  const milliseconds = currentDate - selectedDate;

  const numOfDate = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

  return numOfDate;
}
