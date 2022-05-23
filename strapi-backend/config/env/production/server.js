module.exports = ({ env }) => ({
  proxy: true,
  url: env("4. https://worktime-api.herokuapp.com/"),
  app: {
    keys: env.array("APP_KEYS"),
  },
});
