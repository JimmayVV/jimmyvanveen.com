import React, { Component } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Resume from '../../static/jvanveen.pdf';

class Bio extends Component {

  render() {
    const { name, bio } = this.props.bio;

    return (
      <div className="container" id="bio">
        <h1>{name}</h1>
        <h2>Front End Web Developer</h2>
        <p>
          {bio}
        </p>
        <p>
          <a className="btn btn-lg btn-info" href={Resume} target="_blank">Read my Resume &raquo;</a>
        </p>
      </div>
    );
  }
}

export default createFragmentContainer(
  Bio,
  graphql`
    fragment bio_bio on User {
      name
      bio
    }
  `
);