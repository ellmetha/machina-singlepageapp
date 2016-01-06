/*! Based on React Starter Kit | MIT License | http://www.reactstarterkit.com */

import run from './run';


/**
 * Compiles the project from source files into a distributable
 * format and copies it to the build folder.
 */
async function build() {
  await run(require('./clean'));
  await run(require('./copy'));
  await run(require('./bundle'));
}

export default build;
