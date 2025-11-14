module.exports = {
    apps: [
      {
        name: "fleet-fe",
        script: "npm",
        args: "run start",
        env: {
          NODE_ENV: "production"
        },
        env_production: {
          NODE_ENV: "production",
          NEXT_PUBLIC_API_URL: "https://api.yourdomain.com"
        }
      }
    ]
  };
  