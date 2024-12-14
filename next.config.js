/** @type {import('next').NextConfig} */
/*global console*/
/*global require*/
/*global module*/
/*eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")
const nextConfig = {
  output: "export",
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
    includePaths: [path.join(__dirname, "src/scss/")],
    logger: {
      warn: function (message) {
        console.warn(message)
      },
      debug: function (message) {
        console.log(message)
      },
    },
  },
}

const withSvgr = require("next-plugin-svgr")

module.exports = withSvgr(nextConfig)
