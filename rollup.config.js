const path = require("path");
import {uglify} from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";

export default {
    "input": path.resolve(
        __dirname,
        "./src/index.js"
    ),
    "output": {
        "file": path.resolve(
            __dirname,
            "./dist/dz-transform.js"
        ),
        "format": "umd",
        "name": "Transform",
        "sourcemap": true
    },
    "plugins": [
        uglify(),
        babel({"exclude": "node_modules/**"})
    ]
};
