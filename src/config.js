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

  databaseUrl:
    process.env.DATABASE_URL ||
    'mongodb://webapp:q2NGnqN3BCMJfNsuEc6u@SG-nonProdSharedNyaayaWeb-11609.servers.mongodirector.com:45229,SG-nonProdSharedNyaayaWeb-11607.servers.mongodirector.com:45229,SG-nonProdSharedNyaayaWeb-11608.servers.mongodirector.com:45229/nyaaya?replicaSet=RS-nonProdSharedNyaayaWeb-0&ssl=true',

  analytics: {
    googleTrackingId: process.env.GOOGLE_TRACKING_ID || 'UA-86500535-1', // UA-XXXXX-X
  },
  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'Nyaaya' },
  },
};
