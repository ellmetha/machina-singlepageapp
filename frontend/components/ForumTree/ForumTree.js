import React, { Component, PropTypes } from 'react';
import {
  Col,
  Grid,
  Row
} from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchForums, fetchForumDetails } from '../../actions/forums';
import ForumTreeNode from '../ForumTreeNode';

class ForumTree extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    user: PropTypes.object,
    forums: PropTypes.array,
    forumDetails: PropTypes.object,
    fetchForums: PropTypes.func.isRequired,
    fetchForumDetails: PropTypes.func.isRequired
  };

  static fillStore(redux, nextState) {
    return redux.dispatch(fetchForums(nextState.params.id));
  }

  componentDidMount() {
    this.props.fetchForums(this.props.params.id);
    this.props.fetchForumDetails(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.user !== this.props.user) || (nextProps.params.id !== this.props.params.id)) {
      this.props.fetchForums(nextProps.params.id);
      this.props.fetchForumDetails(nextProps.params.id);
    }
  }

  /*
   * Generates a tree representation of the forum objects.
   */
  getForumTree() {
    let forums = this.props.forums;
    let rootLevel = undefined;
    let _topNodes = [];
    let topNodes = [];
    let currentPath = [];

    /*
     * First creates a list of "top nodes" forums using a flat list of forums
     */
    for (var i = 0; i < forums.length; i++) {
      let forum = forums[i];
      let forumLevel = forum.level;

      if (rootLevel === undefined) {
        // Set the root level to the top node level at the first iteration
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
        _topNodes.push(forum);
      } else {
        // Update the parent of the current forum
        let parentForum = currentPath[currentPath.length - 1];
        forum.parent = parentForum;
        parentForum.children.push(forum);
      }

      // Add the current forum to the end of the current branch
      currentPath.push(forum);
    }

    /*
     * Then creates a new list of "top nodes" forums by embedding forums without categories inside
     * fake categories in order ease the rendering of ForumTreeNode components.
     */
    for (var i = 0; i < _topNodes.length; i++) {
      let forum = _topNodes[i];

      if (forum.type != 1) {
        // Fetches the latest "top node"
        let lastTopNode = topNodes.slice(-1)[0];

        // If the latest "top node" is not a fake category, creates a new fake category
        if (lastTopNode === undefined || lastTopNode.isDummy === undefined) {
          lastTopNode = {
            relativeLevel: 0,
            type: 1,
            isDummy: true,
            children: [],
            id: 'dummy-' + i,
          };
          topNodes.push(lastTopNode);
        }

        // Update the level of the considered forum and the levels of its children nodes
        forum.relativeLevel = 1;
        for (var j = 0; j < forum.children.length; j++) {
          let child = forum.children[j];
          child.relativeLevel = 2;
        }

        // Associates the forum to the current fake category
        forum.parent = lastTopNode;
        lastTopNode.children.push(forum);
      } else {
        // Do nothing special if we are considering a category
        topNodes.push(forum);
      }
    }

    return topNodes;
  }

  render() {
    const { forumDetails } = this.props;
    const forums = this.getForumTree();
    return (
      <Grid>
        <Row>
          <Col md={12}>
            {forumDetails &&
              <h1>{forumDetails.name}</h1>
            }
            {!forumDetails &&
              <div><br /><br /></div>
            }
          </Col>
        </Row>
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
    forums: state.forums.list.map(id => state.forums.items[id]),
    forumDetails: state.forums.details,
  }),
  {fetchForums, fetchForumDetails}
)(ForumTree);
