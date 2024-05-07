import js from "@eslint/js";

export default [
    js.configs.recommended,

    {
        files :[
            "src/**/*.js"
        ],
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "off"
        },
        ignores: [
          "node_modules/*",  
          "public"
        ],
        "settings": {
            "import/resolver": {
                "alias": {
                    "map": [["@", "./src"]],
                    "extensions": [".js"]
                }
            }
        }
    }
];