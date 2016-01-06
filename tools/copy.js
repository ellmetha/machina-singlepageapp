/*! Based on React Starter Kit | MIT License | http://www.reactstarterkit.com */

import Promise from 'bluebird';
import replace from 'replace';


/**
 * Copies static files to the build folder.
 */
async function copy () {
  const ncp = Promise.promisifyAll(require('ncp'));

  await Promise.all([
    ncp.ncpAsync('frontend/public', 'build/public'),
    ncp.ncpAsync('package.json', 'build/package.json'),
  ]);

  replace({
    regex: '"start".*',
    replacement: '"start": "node server.js"',
    paths: ['build/package.json'],
    recursive: false,
    silent: false,
  });
}

export default copy;
