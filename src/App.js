import React, { Component, Fragment } from 'react';
import Bio from './components/bio/bio';
import NavBar from './components/nav-bar/nav-bar';
import Projects from './components/projects/projects';
import Skills from './components/skills/skills';
import GoogleMap from './components/map/map';
import ContactFooter from './components/contact-footer/contact-footer';
import AlertModal from './components/alert-modal/alert-modal';
import { graphql, QueryRenderer } from 'react-relay';
import environment from './relay';
import './site.css';

class App extends Component {
  componentDidMount() {
    //window.domReady();
  }

  render() {
    return (
      <Fragment>
        <div id="bg">
        </div>
        <NavBar />
        <div className="jumbotron jumbotron-fluid vCenterMe">
          <QueryRenderer 
            environment={environment}
            query={graphql`
              query AppQuery {
                bio: user(login:"JimmayVV") {
                  ...bio_bio
                }
              }
            `}
            variables={{}}
            render={({error, props}) => {
              if (error) return <div>Error!</div>
              if (!props) return <div>Loading...</div>
              console.log(props);
              return <Bio bio={props.bio} />
            }}
          />
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
        <div id="footer" className="wrapper">
          <div className="container" id="contact">
            <ContactFooter />
          </div>
        </div>
        <AlertModal message="Thank you for sending me a comment!" />
      </Fragment>
    );
  }
}

export default App;
