export const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat('en-BD', {
      timeZone: 'Asia/Dhaka',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(dateStr));
  };