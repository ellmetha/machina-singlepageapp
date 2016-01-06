import React from 'react';
import Helmet from 'react-helmet';

import Header from '../Header';

if (process.env.BROWSER) require('./App.less');

class App extends React.Component {
  render() {
    return (
      <div id="wrap">
        <Helmet
          title="Machina Forum"
          meta={[
              {"name": "description", "content": "Machina forum application"}
          ]}
        />
        <Header />
        {this.props.children}
      </div>
    );
  }

}

export default App;
