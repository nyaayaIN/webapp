/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

module.exports = {
  port: process.env.PORT || 3000,

  api: {
    clientUrl: process.env.API_CLIENT_URL || '',
    serverUrl:
      process.env.API_SERVER_URL ||
      `http://localhost:${process.env.PORT || 3000}`,
  },

  databaseUrl: process.env.DATABASE_URL || '',

  analytics: {
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },
  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'Nyaaya' },
  },
};
