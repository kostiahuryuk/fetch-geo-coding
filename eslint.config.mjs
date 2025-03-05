/** @type {import("eslint").Linter.FlatConfig} */
import js from "@eslint/js";

export default [
  js.configs.recommended, // ✅ Use recommended JavaScript rules
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs", // ✅ Ensures compatibility with Node.js require()
      globals: {
        console: "readonly",  // ✅ Fixes 'console is not defined'
        process: "readonly",
        __dirname: "readonly",
        jest: "readonly",
        describe: "readonly",
        test: "readonly",
        expect: "readonly"
      }
    }
  }
];