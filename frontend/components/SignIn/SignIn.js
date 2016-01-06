import React, { Component, PropTypes } from 'react';
import {
  Button,
  Col,
  Grid,
  Input,
  Row
} from 'react-bootstrap';
import { connect } from 'react-redux';

import { signin } from '../../actions/auth';

if (process.env.BROWSER) require('./SignIn.less');

class SignIn extends Component {
  static propTypes = {
    user: PropTypes.object,
    signin: PropTypes.func.isRequired
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.refs;
    this.props.signin(username.getValue(), password.getValue());
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <div className="signin-box">
              <form onSubmit={this.handleSubmit}>
                <legend>Sign in</legend>
                <Input type="text" ref="username" label="Username" placeholder="Username" />
                <Input type="password" ref="password" label="Password" placeholder="Password" />
                <div className="buttons-wrapper">
                  <Button bsStyle="primary" type="submit" block={true}>Sign in</Button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }

}

export default connect(
  state => ({user: state.auth.user}),
  {signin}
)(SignIn);
