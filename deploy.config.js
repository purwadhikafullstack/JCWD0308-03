module.exports = {
    apps: [
      {
        name: 'jcwd030803-web',
        script: 'npm',
        args: 'run serve',
        env: {
          PORT: 3083,
          NODE_ENV: 'production',
        },
        cwd: '/var/www/html/jcwd030801.purwadhikabootcamp.com/apps/web',
      },
      {
        name: 'jcwd030803-api',
        script: 'npm',
        args: 'run serve',
        env: {
          PORT: 3183,
          NODE_ENV: 'production',
        },
        cwd: '/var/www/html/jcwd030801.purwadhikabootcamp.com/apps/api',
      },
    ],
   };