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
          <a className="btn btn-lg btn-info" href={Resume} download="jvanveen.pdf">
            <i class="fa fa-file-pdf-o" aria-hidden="true"></i> Read my Resume
          </a>{' '}
          <a className="btn btn-lg btn-primary btn-linkedin" href="https://www.linkedin.com/in/jimmyvanveen/" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-linkedin-square" aria-hidden="true"></i> LinkedIn
          </a>{' '}
          <a className="btn btn-lg btn-success" href="https://github.com/JimmayVV" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-github" aria-hidden="true"></i> GitHub
          </a>
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
)
