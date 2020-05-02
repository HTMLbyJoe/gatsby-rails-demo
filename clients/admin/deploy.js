const ghpages = require('gh-pages');

require('dotenv').config({
  path: `.env`,
})

ghpages.publish('public', {repo: process.env.GH_PAGES_REPO});
