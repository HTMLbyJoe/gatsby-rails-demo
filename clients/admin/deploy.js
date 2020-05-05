const fs = require('fs');
const ghpages = require('gh-pages');
require('./gatsby-config');

const homeDir = require('os').homedir();
const keyDir = `${homeDir}/.ssh`;
const publicKeyFile = `${keyDir}/id_rsa.pub`;
const privateKeyFile = `${keyDir}/id_rsa`;

const publicKey = process.env.DEPLOY_GH_PAGES_PUBLIC_KEY;
const privateKey = process.env.DEPLOY_GH_PAGES_PRIVATE_KEY;

if (
  !fs.existsSync(publicKeyFile) &&
  !fs.existsSync(privateKeyFile) &&
  publicKey &&
  privateKey
) {
  fs.mkdirSync(keyDir, { recursive: true });
  fs.writeFileSync(publicKeyFile, publicKey);
  fs.writeFileSync(privateKeyFile, privateKey);
}

ghpages.publish('public', {
  repo: process.env.GH_PAGES_REPO,
  user: {
    name: 'The Deploy Script',
    email: 'deploy@example.com'
  }
}, (err) => console.error(err));
