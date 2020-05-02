const ghpages = require('gh-pages');
require('./gatsby-config');

ghpages.publish('public', {repo: process.env.GH_PAGES_REPO});
