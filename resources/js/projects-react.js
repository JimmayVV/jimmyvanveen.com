import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ProjectDetail from './project-components/project-detail'
const LocalStorage = 'jimmy-homepage';

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {repos: [
      {repo: { owner: 'JimmayVV', name: 'JimmyVanVeen.com' }, displayName: 'JimmyVanVeen.com', deviceClass: 'jimmy', screenUrl: ''},
      {repo: { owner: 'JimmayVV', name: 'Houdana' }, displayName: 'Houdana', deviceClass: 'houdana', screenUrl: ''},
      {repo: { owner: 'JimmayVV', name: 'Epic-Viewer' }, displayName: 'Epic Viewer', deviceClass: 'epic', screenUrl: ''}
    ]};

    this.state.repos.map((obj, index) => {
      this.getRepoData(obj, index);
    });
  }

  getRepoData(obj, index) {
    let url = `https://api.github.com/repos/${obj.repo.owner}/${obj.repo.name}`;

    let failure = () => {
      if (localStorage.getItem(LocalStorage))
        this.setState({repos: JSON.parse(localStorage.getItem(LocalStorage))});
    };

    let success = (data) => {
      let repos = this.state.repos;
      repos[index].repo = JSON.parse(data);
      this.setState({repos});
      localStorage.setItem(LocalStorage, JSON.stringify(this.state.repos));
    };

    this.getJson(url, success, failure);
    /*
    let r = new XMLHttpRequest();
    r.open("GET", `https://api.github.com/repos/${obj.repo.owner}/${obj.repo.name}`, true);
    r.onreadystatechange = () => {
      if (r.readyState != 4 || r.status != 200) {
        if (localStorage.getItem(LocalStorage))
          this.setState({repos: JSON.parse(localStorage.getItem(LocalStorage))});
        return;
      }
      let repos = this.state.repos;
      repos[index].repo = JSON.parse(r.responseText);
      this.setState({repos});
      localStorage.setItem(LocalStorage, JSON.stringify(this.state.repos));
    };
    r.send('');*/
  }

  getReadmeInfo(obj, index) {

  }

  getJson(url, success = () => {}, failure = () => {}, async = true) {
    let request = new XMLHttpRequest();
    request.open('GET', url, async);
    request.onload = () => {
      if (request.readyState != 4 || request.status != 200) {
        failure();
        return;
      } else {
        success(request.responseText);
      }
    };

    request.onerror = () => {
      console.log(`Error running AJAX command for URL: ${url}`);
    };
    request.send();
  }

  render() {
    return (
      <div>
        {this.state.repos.map(repo =>
          <ProjectDetail key={repo.displayName} repo={repo} />
        )}
      </div>
    );
  }
}

ReactDOM.render(<Projects />, document.getElementById('projects'));