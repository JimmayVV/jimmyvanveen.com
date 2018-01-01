import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import Marked from 'marked';

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
              <h4 className="card-title">{repo.displayName}</h4>
              <p className="card-text">{repo.repo.description && repo.repo.description}</p>
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