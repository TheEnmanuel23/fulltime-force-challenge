export default () => ({
  github: {
    token: process.env.GT_TOKEN,
    username: process.env.GT_USERNAME,
    repository: process.env.GT_REPOSITORY,
  },
});
