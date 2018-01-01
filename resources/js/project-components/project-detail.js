import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

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
                <p>
                  Upon entering the Design Services department with Deluxe Corporation, I quickly identified several web-based tools that could be consolidated and improved upon with front end web development.
                </p>
                <p>
                  While the back-ends of all services were isolated from my department, I was able to reverse-engineer all the main API routes to the back-end services, and coded an improved version of a primary tool which was called "EPIC Viewer" (to this day, I still do not know why the original author called it that).
                </p>
                <p>
                  Using a combination of vanilla JavaScript, jQuery, and plugins such as Data Tables and a keyboard shortcut helper library, I was able to consolidate the several tools into one improved web app.
                </p>
                <p>
                  In addition to the improved web app, I was able to introduce several new tools to this app specifically designed to improve productivity of the entire team of 40+ individuals.
                </p>
                <p>
                  This project is source controlled by Git, and is viewable on my Bitbucket profile page.
                </p>
              </Collapse>

            </div>
            
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default ProjectDetail;