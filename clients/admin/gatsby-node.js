/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  // https://stackoverflow.com/a/60191051
  const config = getConfig()

  const allowedEnvironmentVariables = ["API_URL"]

  // Allow whitelisted environment variables to be used in the browser
  const definePlugin = config.plugins.find(p => p.definitions)
  for (const [key, value] of Object.entries(process.env)) {
    if (allowedEnvironmentVariables.includes(key)) {
      definePlugin.definitions[`process.env.${key}`] = JSON.stringify(value)
    }
  }

  actions.replaceWebpackConfig(config)
}
