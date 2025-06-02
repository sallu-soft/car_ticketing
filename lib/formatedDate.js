export const formatDate = (input) => {
  if (!input) return '';

  // Ensure we are working with a string in ISO format
  const isoString = typeof input === 'string' ? input : input.toISOString();

  const [datePart, timePart] = isoString.split('T');
  const [year, month, day] = datePart.split('-');
  const [hourStr, minuteStr] = timePart.split(':');

  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const ampm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12; // Convert to 12-hour format

  return `${day}-${month}-${year} ${hour}:${minute} ${ampm}`;
};
