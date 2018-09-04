import React, { Component, Fragment } from 'react';
//import Bio from './components/bio/bio';
import NavBar from './components/nav-bar/nav-bar';
//import Projects from './components/projects/projects';
import AppRenderer from './AppRenderer';
import Skills from './components/skills/skills';
import GoogleMap from './components/map/map';
import ContactFooter from './components/contact-footer/contact-footer';
import AlertModal from './components/alert-modal/alert-modal';
import { graphql, QueryRenderer } from 'react-relay';
import environment from './relay';
import './site.css';

const repos = [
  { id: 'MDEwOlJlcG9zaXRvcnk4MTM4NjM5Mg==', displayName: 'Jimmy\'s Home Page', deviceClass: 'jimmy' },
  { id: 'MDEwOlJlcG9zaXRvcnk3NDA5ODIyNw==', displayName: 'Houdana', deviceClass: 'houdana' },
  //{ id: 'MDEwOlJlcG9zaXRvcnk4MTQ3NzU2MQ==', displayName: 'Epic Viewer', deviceClass: 'epic' },
  { id: 'MDEwOlJlcG9zaXRvcnk4MTQ4MTM4Nw==', displayName: 'Card Games', deviceClass: 'card-games' },
  { id: 'MDEwOlJlcG9zaXRvcnkxMDA0MjI3Mjk=', displayName: 'Free Code Camp', deviceClass: 'fccWork' },
  //{ id: 'MDEwOlJlcG9zaXRvcnkxMDI2NjQ4NjE=', displayName: 'Logo Design ARN\'s', deviceClass: 'logo-design-arns' },
  //{ id: 'MDEwOlJlcG9zaXRvcnk4MTQ4MTI0Mg==', displayName: 'Feedback Application', deviceClass: 'feedback-application' },
  { id: 'MDEwOlJlcG9zaXRvcnk4MTQ3Nzg5OA==', displayName: 'List Generator', deviceClass: 'list-generator' }
];

const repoIds = repos.map((repo) => { return repo.id });

class App extends Component {
  componentDidMount() {
    //window.domReady();
  }

  render() {
    return (
      <Fragment>
        <div id="bg" />
        <NavBar />
        <QueryRenderer 
          environment={environment}
          query={graphql`
            query AppQuery($repoIds:[ID!]!) {
              projects: nodes(ids:$repoIds){
                ...projects_projects
              }
              bio: user(login:"JimmayVV") {
                ...bio_bio
              }
            }
          `}
          variables={{repoIds}}
          render={({error, props}) => {
            if (error) return <div>Error!</div>
            if (!props) return <div>Loading...</div>
            return <AppRenderer props={props} repos={repos} />;
          }}
        />
        <div className="wrapper">
          <div className="container">
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
