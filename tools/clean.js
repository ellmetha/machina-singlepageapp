/*! Based on React Starter Kit | MIT License | http://www.reactstarterkit.com */

import Promise from 'bluebird';
import del from 'del';


/**
 * Cleans up the build directory.
 */
async function clean () {
  const mkdirp = Promise.promisifyAll(require('mkdirp'));

  await del(['.tmp', 'build/*', '!build/.git'], { dot: true });
  await mkdirp.mkdirpAsync('build/public');
}

export default clean;
