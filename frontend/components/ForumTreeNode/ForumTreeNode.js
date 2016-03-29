import React, { Component, PropTypes } from 'react';
import {
  Col,
  Grid,
  Row
} from 'react-bootstrap';
import { Link } from 'react-router';

if (process.env.BROWSER) require('./ForumTreeNode.less');

class ForumTreeNode extends React.Component {
  static propTypes = {
    forum: PropTypes.object,
  };

  render() {
    const { forum } = this.props;
    return (
      <div className="forum-node">
        {forum.relativeLevel == 0 &&
          <div>
            {forum.type == 1 &&
              <div className="panel panel-default forumlist">
                  <div className="panel-heading">
                    <Row className="panel-row">
                      {forum.isDummy &&
                        <Col md={8} sm={9} xs={12} className="forum-name-col">
                          <h3 className="panel-title">Forums</h3>
                        </Col>
                      }
                      {forum.isDummy == undefined &&
                        <Col md={8} sm={9} xs={12} className="forum-name-col">
                          <h3 className="panel-title">
                            <Link to={`/forum/${this.props.forum.id}`} className="brand">{ forum.name }</Link>
                          </h3>
                        </Col>
                      }
                      <Col md={1} className="forum-count-col hidden-sm hidden-xs">Topics</Col>
                      <Col md={1} className="forum-count-col hidden-sm hidden-xs">Posts</Col>
                      <Col md={2} sm={3} className="forum-last-post-col hidden-xs">Last post</Col>
                    </Row>
                  </div>
                  <div className="panel-body">
                    {forum.children
                      .map(
                        childForum => {
                          return (
                            <ForumTreeNode key={childForum.id} forum={childForum} />
                          );
                        }
                      )
                    }
                  </div>
              </div>
            }
          </div>
        }
        {forum.relativeLevel == 1 &&
          <div>
            {forum.parent.type == 1 &&
              <Row className="panel-row">
                {forum.type == 0 &&
                  <div>
                    <Col md={8} sm={9} xs={11} className="forum-name">
                      <table className="forum-data-table">
                        <tbody>
                          <tr>
                            <td className="forum-icon">
                              <i className="fa fa-tasks fa-2x"></i>
                            </td>
                            <td>
                              <Link to={`/forum/${forum.id}`} className="forum-name-link">{ forum.name }</Link>
                              <div className="forum-description" dangerouslySetInnerHTML={ { __html: forum.description } } />
                              <div className="sub-forums">
                                {forum.children.length > 0 &&
                                  <div>
                                    <b>Subforums:</b>
                                    {forum.children
                                      .map(
                                        childForum => {
                                          return (
                                            <ForumTreeNode key={childForum.id} forum={childForum} />
                                          );
                                        }
                                      )
                                    }
                                  </div>
                                }
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                    <Col md={1} className="forum-count hidden-sm hidden-xs">{ forum.topics_count }</Col>
                    <Col md={1} className="forum-count hidden-sm hidden-xs">{ forum.posts_count }</Col>
                    <Col md={2} sm={3} className="hidden-xs forum-last-post">
                      TODO
                    </Col>
                  </div>
                }
                {forum.type == 2 &&
                  <div>
                    <Col md={8} sm={9} xs={11}>
                      <table className="forum-data-table">
                        <tbody>
                          <tr>
                            <td className="forum-icon link">
                              <i className="fa fa-external-link-square fa-2x"></i>
                            </td>
                            <td>
                              <a href={forum.link} className="forum-name-link">{forum.name}</a>
                              <div className="forum-description" dangerouslySetInnerHTML={ { __html: forum.description } } />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                    <Col md={1} className="forum-count hidden-sm hidden-xs"></Col>
                    <Col md={1} className="forum-count hidden-sm hidden-xs"></Col>
                  </div>
                }
              </Row>
            }
          </div>
        }
        {forum.relativeLevel == 2 &&
          <span>
            <i className="fa fa-file"></i>&nbsp;
            <Link to={`/forum/${forum.id}`}>{forum.name}</Link>
            &nbsp;&nbsp;
          </span>
        }
      </div>
    );
  }
}

export default ForumTreeNode;
