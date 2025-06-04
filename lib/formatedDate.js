export const formatDate = (input) => {
  if (!input) return '';

  const date = new Date(input);

  const options = {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat('en-GB', options);
  return formatter.format(date).replace(',', '');
};
export const toDatetimeLocal = (dateInput) => {
  const date = new Date(dateInput);
  const bangladeshOffset = 6 * 60; // BST is UTC+6
  const localDate = new Date(date.getTime() + bangladeshOffset * 60000);

  const pad = n => String(n).padStart(2, '0');

  const year = localDate.getUTCFullYear();
  const month = pad(localDate.getUTCMonth() + 1);
  const day = pad(localDate.getUTCDate());
  const hours = pad(localDate.getUTCHours());
  const minutes = pad(localDate.getUTCMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};