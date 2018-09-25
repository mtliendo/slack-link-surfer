import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
export default {
  input: "src/index.js",
  output: {
    file: "slack-link-surfer.js",
    format: "umd",
    name: "slackLinkSurfer"
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**" // only transpile our source code
    })
  ]
};
