import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";
import builtins from "rollup-plugin-node-builtins";

export default {
  input: "src/index.js",
  output: {
    file: "dist/slack-link-surfer.js",
    format: "umd",
    name: "slackLinkSurfer"
  },
  plugins: [
    json(),
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**" // only transpile our source code
    })
  ]
};
