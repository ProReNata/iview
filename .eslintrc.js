/** configuration */
module.exports = {
    /**
     * @see {@link https://eslint.org/docs/user-guide/configuring#specifying-environments|env}
     */
    env: {},

    /**
     * @see {@link https://eslint.org/docs/user-guide/configuring#extending-configuration-files|extends}
     */
    extends: ["@prorenata/eslint-config-vue"],

    /**
     * You can define global variables here.
     * @see {@link https://eslint.org/docs/user-guide/configuring#specifying-globals|globals}
     */
    globals: {
        iview: false
    },

    /**
     * Sometimes a more fine-controlled configuration is necessary, for example if the configuration
     * for files within the same directory have to be different.
     * @see {@link https://eslint.org/docs/user-guide/configuring#configuration-based-on-glob-patterns|overrides}
     */
    overrides: [
        {
            files: ["build/**/*.js", "examples/**/*.{js,vue}"],
            rules: {
                "import/no-extraneous-dependencies": [
                    "error",
                    {
                        devDependencies: true
                    }
                ],
                "no-console": "off"
            }
        }
    ],

    /**
     * @see {@link https://eslint.org/docs/user-guide/configuring#specifying-parser-options|parserOptions}
     */
    parserOptions: {},

    /**
     * @see {@link https://eslint.org/docs/user-guide/configuring#configuring-plugins|plugins}
     */
    plugins: [],

    /**
     * @see {@link https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy|root}
     */
    root: true,

    /**
     * @see {@link https://eslint.org/docs/user-guide/configuring#configuring-rules|rules
     */
    rules: {
        camelcase: "off",
        "import/no-dynamic-require": "off",
        "consistent-return": "off",
        "func-names": "off",
        "global-require": "off",
        "guard-for-in": "off",
        "max-len": "off",
        "no-param-reassign": "off",
        "no-plusplus": "off",
        "no-continue": "off",
        "no-underscore-dangle": "off",
        "no-restricted-syntax": "off",
        "no-shadow": "off",
        "no-unused-expressions": "off",
        "no-nested-ternary": "off",
        "no-return-assign": "off",
        "no-loop-func": "off",
        "no-restricted-properties": "off",
        "no-sequences": "off",
        "prefer-destructuring": "off",
        "array-callback-return": "off",
        "babel/no-invalid-this": "off",
        "babel/new-cap": "off",
        "babel/no-unused-expressions": "off",
        "babel/camelcase": "off",
        "compat/compat": process.env.NODE_ENV === "production" ? "off" : "warn",
        "eslint-comments/no-use": "off",
        "promise/always-return": "off",
        "promise/avoid-new": "off",
        "promise/catch-or-return": "off",
        "vue/require-default-prop": "off",
        "vue/require-v-for-key": "off",
        "vue/valid-v-model": "off",
        "vue/name-property-casing": "off",
        "vue/no-side-effects-in-computed-properties": "off",
        "vue/component-name-in-template-casing": "off",
        "vue/no-unused-components": "off",
        "vue/no-parsing-error": "off",
        "vue/no-v-html": "off",
        "vue/require-prop-type-constructor": "off", // New rule currently buggy in 5.0.0.beta.3
        "jsdoc/implements-on-classes": "off",
        "prefer-exponentiation-operator": "off",
        "default-param-last": "off",
        "no-constructor-return": "off",
        "no-dupe-else-if": "off",
        "no-import-assign": "off",
        "no-setter-return": "off",
        "grouped-accessor-pairs": "off",
        "prefer-regex-literals": "off"
    },

    /**
     * Webpack-literate module resolution plugin for eslint-plugin-import.
     * @see {@link https://www.npmjs.com/package/eslint-import-resolver-webpack|plugin}
     */
    settings: {
        "import/resolver": {
            webpack: {
                config: "./build/webpack.dev.config.js"
            }
        },
        polyfills: ["promises"]
    }
};
