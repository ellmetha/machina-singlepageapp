/*! Based on React Starter Kit | MIT License | http://www.reactstarterkit.com */

import webpack from 'webpack';

import webpackConfig from '../webpack.config';


/**
 * Bundles assets into some packages ready to be used in a browser.
 */
function bundle() {
  return new Promise((resolve, reject) => {
    const bundler = webpack(webpackConfig);
    let bundlerRunCount = 0;

    function onComplete(err, stats) {
      if (err) {
        return reject(err);
      }

      console.log(stats.toString(webpackConfig[0].stats));

      if (++bundlerRunCount === (global.WATCH ? webpackConfig.length : 1)) {
        return resolve();
      }
    }

    if (global.WATCH) {
      bundler.watch(200, onComplete);
    } else {
      bundler.run(onComplete);
    }
  });
}

export default bundle;
