/*! Based on React Starter Kit | MIT License | http://www.reactstarterkit.com */

import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import run from './run';

global.WATCH = true;
const appWebpackConfig = require('../webpack.config').default[0];
const bundler = webpack(appWebpackConfig); // Client-side bundle configuration


/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  await run(require('./build'));
  await run(require('./serve'));

  browserSync({
    notify: false,
    open: false,
    proxy: {

      target: 'localhost:5000',

      middleware: [
        webpackDevMiddleware(bundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: appWebpackConfig.output.publicPath,

          // Pretty colored output
          stats: appWebpackConfig.stats,
        }),

        // bundler should be the same as above
        webpackHotMiddleware(bundler),
      ],
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'build/public/**/*.css',
      'build/public/**/*.html',
      'build/content/**/*.*',
      'build/templates/**/*.*',
    ],
  });
}

export default start;
