import React, { Component } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import ProjectDetail from './details/project-details';

// https://www.howtographql.com/react-relay/2-queries-loading-links/

class Projects extends Component {

  render() {
    let { projects, repos } = this.props;
    return (
      <div className="row">
        {projects.map((project, index) => {
          let repo = repos.find((item) => {
            return item.id === project.__id;
          });
          return <ProjectDetail key={index} project={project} repo={repo} />
        })}
      </div>
    );
  }
}

export default createFragmentContainer(
  Projects,
  graphql`
    fragment projects_projects on Node @relay(plural: true) {
      ... on Repository {
        ...projectDetails_project
      }
    }
  `
);