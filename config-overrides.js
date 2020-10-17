/* config-overrides.js */

const { override } = require("customize-cra")
const { addReactRefresh } = require("customize-cra-react-refresh")

// const pluginProposalDecorators = require("@babel/plugin-proposal-decorators")

module.exports = override(
  //   addDecoratorsLegacy(),
  addReactRefresh()

  // addBabelPlugin(pluginProposalDecorators)
)
