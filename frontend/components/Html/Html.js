import React, { Component, PropTypes } from 'react';
import config from '../../config';

class Html extends Component {

  static propTypes = {
    body: PropTypes.string.isRequired,
    initialState: PropTypes.string,
  };

  trackingCode() {
    return ({ __html:
      `(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=` +
      `function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;` +
      `e=o.createElement(i);r=o.getElementsByTagName(i)[0];` +
      `e.src='https://www.google-analytics.com/analytics.js';` +
      `r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));` +
      `ga('create','${config.googleAnalyticsId}','auto');ga('send','pageview');`,
    });
  }

  initialStateCode() {
    return ({ __html:
      `window.__initialState=${this.props.initialState};`,
    });
  }

  render() {
    return (
      <html className="no-js" lang="">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {this.props.head.title.toComponent()}
        {this.props.head.meta.toComponent()}
        {this.props.head.link.toComponent()}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }} />
        <script dangerouslySetInnerHTML={this.initialStateCode()} />
        <script src={this.props.entry}></script>
        <script dangerouslySetInnerHTML={this.trackingCode()} />
      </body>
      </html>
    );
  }

}

export default Html;
