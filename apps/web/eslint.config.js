import baseConfig from "@akptest/eslint-config/base";
import reactJsConfig from "@akptest/eslint-config/react";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export default [...baseConfig, ...reactJsConfig];
