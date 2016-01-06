import merge from 'lodash.merge';
import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const WATCH = global.WATCH === undefined ? false : global.WATCH;
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? JSON.stringify('development') : JSON.stringify('production'),
  __DEV__: DEBUG,
};

//
// Common configuration chunk to be used for both
// client-side (app.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const baseConfig = {
  output: {
    publicPath: '/',
    sourcePrefix: '  ',
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ],

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.txt$/,
        loader: 'raw-loader',
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.(eot|ttf|wav|mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
};

//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

const appConfig = merge({}, baseConfig, {
  entry: {
    app: [
      ...(WATCH ? ['webpack-hot-middleware/client'] : []),
      './frontend/client.js',
    ],
  },
  output: {
    path: path.join(__dirname, './build/public'),
    filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js',
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.DefinePlugin({
      'process.env': {
          BROWSER: JSON.stringify(true)
      }
    }),
    new AssetsPlugin({
      path: path.join(__dirname, './build'),
      filename: 'assets.json',
    }),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: VERBOSE,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
    ] : []),
    ...(WATCH ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : []),
  ],
});

// Enable React Transform in the "watch" mode
// appConfig.module.loaders
//   .filter(x => WATCH && x.loader === 'babel-loader')
//   .forEach(x => x.query = {
//     // Wraps all React components into arbitrary transforms
//     // https://github.com/gaearon/babel-plugin-react-transform
//     presets: ['es2015', 'react'],
//     plugins: ['react-transform'],
//     extra: {
//       'react-transform': {
//         transforms: [
//           {
//             transform: 'react-transform-hmr',
//             imports: ['react'],
//             locals: ['module'],
//           }, {
//             transform: 'react-transform-catch-errors',
//             imports: ['react', 'redbox-react'],
//           },
//         ],
//       },
//     },
//   });

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = merge({}, baseConfig, {
  entry: './frontend/server.js',
  output: {
    path: './build',
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: [
    /^\.\/assets\.json$/,
    function filter(context, request, cb) {
      const isExternal =
        request.match(/^[@a-z][a-z\/\.\-0-9]*$/i) &&
        !request.match(/^react-routing/) &&
        !context.match(/[\\/]react-routing/);
      cb(null, Boolean(isExternal));
    },
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
  ],
});


export default [appConfig, serverConfig];
