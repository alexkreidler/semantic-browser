// import * as path from "path"

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  // addons: ['@storybook/addon-knobs'],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-essentials",
    {
      name: "@storybook/preset-typescript",
      // options: {
      //   tsLoaderOptions: {
      //     configFile: path.resolve(__dirname, '../tsconfig.json'),
      //   },
      //   forkTsCheckerWebpackPluginOptions: {
      //     colors: false, // disables built-in colors in logger messages
      //   },
      //   include: [path.resolve(__dirname, '../src')],
      //   transpileManager: true,
      // },
    },
    // {
    //   name: '@storybook/addon-docs',
    //   options: { configureJSX: true },
    // },
  ],
}
