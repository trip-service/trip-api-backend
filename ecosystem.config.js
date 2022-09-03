module.exports = {
    apps: [
      {
        name: 'trip-backend-api',
        script: 'server.js',
        watch: '.',
        env: {
          NODE_ENV: 'uat',
        },
      },
    ],
  };
