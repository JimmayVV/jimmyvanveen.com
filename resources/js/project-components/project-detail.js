import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import Marked from 'marked';
let Renderer = new Marked.Renderer();

// Set a custom heading renderer
Renderer.heading = function(text, level) {
  // Todo - remove this, and change the CSS Styling of H1 tags, rather then demoting them
  level = (level > 3) ? 6 : level + 2;
  return `<h${level}>${text}</h${level}>`;
  console.log('Header function');
};

Marked.setOptions({renderer: Renderer});

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  render() {
    let repo = this.props.repo;
    let readme = (<div dangerouslySetInnerHTML={repo.readme ? {__html: Marked(repo.readme)} : {__html: 'No readme'}}></div>);
    //console.log(repo);
    return (
      <Card>
        <CardBody>
          <div className="row">

            <div className="col-12 col-md-5">
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
              <p className="card-text">{repo.repo.description || ''}</p>
              <p>
                <a href="#" className="btn btn-primary mr-2">Visit Site</a>
                <Button color="primary" onClick={() => this.toggle()}>Read More</Button>
              </p>

              <Collapse isOpen={this.state.collapse} id={`readMore${repo.deviceClass}`}>
                {readme}
              </Collapse>

            </div>
            
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default ProjectDetail;