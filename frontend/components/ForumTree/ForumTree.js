import React, { Component, PropTypes } from 'react';
import {
  Col,
  Grid,
  Row
} from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchForums } from '../../actions/forums';
import ForumTreeNode from '../ForumTreeNode';

class ForumTree extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    user: PropTypes.object,
    forums: PropTypes.array,
    fetchForums: PropTypes.func.isRequired
  };

  static fillStore(redux, nextState) {
    return redux.dispatch(fetchForums(nextState.params.id));
  }

  componentDidMount() {
    this.props.fetchForums(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.user !== this.props.user) || (nextProps.params.id !== this.props.params.id)) {
      this.props.fetchForums(nextProps.params.id);
    }
  }

  /*
   * Generates a tree representation of the forum objects.
   */
  getForumTree() {
    let forums = this.props.forums;
    let rootLevel = undefined;
    let topNodes = [];
    let currentPath = [];

    for (var i = 0; i < forums.length; i++) {
      let forum = forums[i];
      let forumLevel = forum.level;

      if (rootLevel === undefined) {
        // Set the root level to the top node level at the furst iteration
        rootLevel = forumLevel;
      }

      // Attach a relative level to the forum object
      forum.relativeLevel = forumLevel - rootLevel;

      // All forum children will be stored in an array attached to the
      // forum object
      forum.children = [];

      // Removes the forum that are not in the current branch
      while (currentPath.length > forum.relativeLevel) {
        currentPath.pop();
      }

      if (forumLevel == rootLevel) {
        // The forum is one of the top-level nodes
        topNodes.push(forum);
      } else {
        // Update the parent of the current forum
        let parentForum = currentPath[currentPath.length - 1];
        forum.parent = parentForum;
        parentForum.children.push(forum);
      }

      // Add the current forum to the end of the current branch
      currentPath.push(forum);
    }

    return topNodes;
  }

  render() {
    const forums = this.getForumTree();
    return (
      <Grid>
        <Row>
          <Col md={12}>
            {forums.length > 0 &&
              // A list of forums can be displayed
              <div>
                {forums
                  .map(
                    forum => {
                      return (
                        <ForumTreeNode key={forum.id} forum={forum} />
                      );
                    }
                  )
                }
              </div>
            }
            {!forums.length > 0 &&
              // No forums can be displayed
              <div className="panel panel-default forumlist">
                  <div className="panel-heading">
                    <Row className="panel-row">
                      <Col md={8} sm={9} xs={12} className="forum-name-col">
                        <h3 className="panel-title">Forums</h3>
                      </Col>
                      <Col md={1} className="forum-count-col hidden-sm hidden-xs">Topics</Col>
                      <Col md={1} className="forum-count-col hidden-sm hidden-xs">Posts</Col>
                      <Col md={2} sm={3} className="forum-last-post-col hidden-xs">Last post</Col>
                    </Row>
                  </div>
                  <div className="panel-body">
                    <Row className="panel-row">
                      <Col md={12}>No forums.</Col>
                    </Row>
                  </div>
              </div>
            }
          </Col>
        </Row>
      </Grid>
    );
  }

}

export default connect(
  state => ({
    user: state.auth.user,
    forums: state.forums.list.map(id => state.forums.items[id])
  }),
  {fetchForums}
)(ForumTree);
