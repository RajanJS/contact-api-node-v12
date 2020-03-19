module.exports = {
  apps: [{
    name: 'API',
    script: 'node -r esm .',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      "NODE_ENV": "development",
      "MONGO_USER": "admin",
      "MONGO_PASS": "Note123",
      "MONGO_HOST": "cluster0-1xgsh.mongodb.net",
      "API_USER": "admin",
      "API_PASS": "supersecret2",
      "REDIS_PASSWORD": "cmVkaXNwYXNzMQo=",
      "REDIS_HOST": "localhost",
      "REDIS_PORT": 6379,
      "CORS_WHITELIST": "",
      "RATE_LIMIT_MAX_REQUESTS": 100,
      "RATE_LIMIT_WINDOW_MS": 0
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
