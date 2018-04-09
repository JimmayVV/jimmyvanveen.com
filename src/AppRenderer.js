import React, { Component, Fragment } from 'react';
import Bio from './components/bio/bio';
import Projects from './components/projects/projects';

export default class AppRenderer extends Component {
  render() {
    let { props, repos } = this.props;
    //console.log(`AppRenderer (props): ${JSON.stringify(props)}`);
    let loading = <div>Loading...</div>;
    let bio = (props.bio)? <Bio bio={props.bio} /> : loading;
    let projects = (props.projects) ? <Projects projects={props.projects} repos={repos} /> : loading;
    return (
      <Fragment>
        <div className="jumbotron jumbotron-fluid vCenterMe">
          {bio}
        </div>
        <div className="wrapper" id="nav-change">
          <div className="container">

            <h1>Projects</h1>
            <div id="projects">
              {projects}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}