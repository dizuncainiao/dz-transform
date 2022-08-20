const path = require("path");
import {defineConfig} from 'rollup'
import dts from 'rollup-plugin-dts';
import {uglify} from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";
import ts from 'rollup-plugin-typescript2'

const tsPlugin = ts({
    tsconfig: path.resolve(
        __dirname,
        "./tsconfig.json"
    ), // 导入本地ts配置
    extensions: [
        '.js',
        '.ts',
        '.tsx'
    ]
})

export default defineConfig([
    {
        "input": path.resolve(
            __dirname,
            "./src/index.ts"
        ),
        "output": {
            "file": path.resolve(
                __dirname,
                "./dist/umd/dz-transform.js"
            ),
            "format": "umd",
            "name": "Transform",
            "sourcemap": true
        },
        "plugins": [
            tsPlugin,
            uglify(),
            babel({"exclude": "node_modules/**"})
        ]
    },
    {
        "input": path.resolve(
            __dirname,
            "./src/index.ts"
        ),
        "output": {
            "file": path.resolve(
                __dirname,
                "./dist/es/dz-transform.js"
            ),
            "format": "esm",
            "name": "Transform",
            "sourcemap": true
        },
        "plugins": [
            tsPlugin,
            uglify(),
            babel({"exclude": "node_modules/**"})
        ]
    },
    {
        input: path.resolve(
            __dirname,
            "./src/index.ts"
        ),
        plugins: [dts()],
        output: {
            format: 'esm',
            file: './index.d.ts',
        },
    }
])
