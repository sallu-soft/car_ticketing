
const cron = require('node-cron');
const fetch = require('node-fetch');

cron.schedule('* * * * *', async () => {
  try {
    const res = await fetch(`https://cholonbd.com/api/delete-expired-tickets`);
    const result = await res.json();
    console.log('Deleted:', result.deleted);
  } catch (err) {
    console.error('Failed to trigger delete:', err);
  }
});