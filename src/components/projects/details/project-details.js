import React, { Component } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import Marked from 'marked';
const Renderer = new Marked.Renderer();

// Set a custom heading renderer
Renderer.heading = function (text, level) {
  // Todo - remove this, and change the CSS Styling of H1 tags, rather then demoting them
  level = (level > 3) ? 6 : level + 2;
  return `<h${level}>${text}</h${level}>`;
};

Marked.setOptions({ renderer: Renderer });

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    let { project, repo } = this.props;
    //console.log(`Project Detail (repo): ${JSON.stringify(repo)}`);
    let readme = (<div dangerouslySetInnerHTML={project.readme ? { __html: Marked(project.readme.text) } : { __html: 'No readme' }}></div>);
    
    return (
      <div className="col col-md-6">
        <Card>
          <CardBody>
            <div className="row">

              <div className="col-12 col-lg-10 offset-lg-1 col-md-8 offset-md-2">
                <div className={`device-wrapper ${repo.deviceClass}`}>
                  <div className="device" data-device="iMac" data-orientation="portrait" data-color="black">
                    <div className="screen">
                      {/*<!-- PUT CONTENTS HERE -->*/}
                    </div>
                    <div className="button">
                      {/*<!-- You can hook the "home button" to some JavaScript events or just remove it -->*/}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <h2 className="card-title">{repo.displayName}</h2>
                <p className="card-text">{project.description || ''}</p>
                <p className="row no-gutters">
                  <span className="col-12 col-md-3 mr-1 mb-1"><a href={project.url ? project.url : '#top'} className="btn btn-success btn-block mb-1" target="_blank">Github Repo</a></span>
                  {project.homepageUrl &&
                    <span className="col-12 col-md-3 mr-1 mb-1"><a href={project.homepageUrl} target='_blank' className="btn btn-primary btn-block mb-1">Visit Site</a></span>
                  }
                  <span className="col-12 col-md-3"><Button block color="info" onClick={() => this.toggle()}>Read {!this.state.collapse ? 'More' : 'Less'}</Button></span>
                </p>

                <Collapse isOpen={this.state.collapse} id={`readMore${repo.deviceClass}`}>
                  {readme}
                </Collapse>

              </div>

            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default createFragmentContainer(
  ProjectDetail,
  graphql`
    fragment projectDetails_project on Repository {
      name
      id
      homepageUrl
      description
      url
      readme: object(expression: "master:README.md") {
        ... on Blob {
          text
        }
      }
    }
  `
);