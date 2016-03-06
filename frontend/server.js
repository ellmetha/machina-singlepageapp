import 'babel-polyfill';
import cookieParser from 'cookie-parser';
import createHistory from 'history/lib/createMemoryHistory';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';
import serialize from 'serialize-javascript';

import assets from './assets.json';
import Html from './components/Html';
import routes from './routes';
import configureStore from './store';
import fillStore from './utils/fillStore';
import getJwtTokenPayload from './utils/getJwtTokenPayload';

const server = global.server = express();
const port = process.env.PORT || 5000;
delete process.env.BROWSER;
server.set('port', port);

//
// Register Node.js middlewares
// -----------------------------------------------------------------------------
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    let content = '';
    let token = req.cookies ? req.cookies.token : undefined;
    let payload = getJwtTokenPayload(token);
    const store = configureStore({ auth: { token, user: payload } });

    await match({ routes, location: req.url }, async (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        statusCode = 500;
        content = error.message;
      } else if (!renderProps) {
        statusCode = 404;
        content = 'Not found';
      } else {
        // Fill the store by using a promise that will call an asynchronous API on the
        // components associated wit the current route
        await fillStore(store, renderProps, renderProps.components);

        // Prepare the context that will be used to initialize the body of the response
        const context = {
          head: null,
          body: '',
          entry: assets.app.js,
          initialState: serialize(store.getState()),
        }

        context.body = ReactDOM.renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        context.head = Helmet.rewind();
        content = '<!doctype html>\n' + ReactDOM.renderToStaticMarkup(<Html {...context} />);
      }

      res.status(statusCode).send(content);
    });
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
