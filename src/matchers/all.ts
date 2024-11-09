/**
 * All the matchers defined by Rigoletto.
 *
 * To install them at runtime, you'll need this reference in Vitest's configuration file:
 *
 * ```
 * test: {
 *  setupFiles: ["@giancosta86/rigoletto/matchers/all"]
 * }
 * ```
 *
 * To access them via TypeScript, just add this line to some global `.d.ts` file included by **tsconfig.json**:
 *
 * ```
 * import "@giancosta86/rigoletto/matchers/all";
 * ```
 *
 * @module
 */
import "./nodejs/index.js";
import "./vanilla/index.js";
