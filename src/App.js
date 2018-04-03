import React, { Component, Fragment } from 'react';
import Bio from './components/bio/bio';
import NavBar from './components/nav-bar/nav-bar';
import Projects from './components/projects/projects';
import Skills from './components/skills/skills';
import GoogleMap from './components/map/map';
import ContactFooter from './components/contact-footer/contact-footer';
import './site.css';

class App extends Component {
  componentDidMount() {
    window.domReady();
  }

  render() {
    return (
      <Fragment>
        <div id="bg">
        </div>
        <NavBar />
        <div className="jumbotron jumbotron-fluid vCenterMe">
          <Bio />
        </div>
        <div className="wrapper" id="nav-change">
          <div className="container">

            <h1>Projects</h1>
            <div id="projects">
              <Projects />
            </div>

            <h1 id="skills">Skills</h1>
            <Skills />
          </div>
        </div>
        <GoogleMap />
        <ContactFooter />
      </Fragment>
    );
  }
}

export default App;
