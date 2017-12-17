import React from 'react';
import ReactDOM from 'react-dom';

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {repos: [
      {owner: 'JimmayVV', name: 'JimmyVanVeen.com', repo: {}},
      {owner: 'JimmayVV', name: 'Houdana', repo: {}},
      {owner: 'JimmayVV', name: 'Epic-Viewer', repo: {}}
    ]};

    /*this.state.repos.map(obj => {
      return this.getRepoData(obj);
    });*/
  }

  getRepoData(obj) {
    let r = new XMLHttpRequest();
    r.open("GET", `https://api.github.com/repos/${obj.owner}/${obj.name}`, true);
    r.onreadystatechange = () => {
      if (r.readyState != 4 || r.status != 200) return;
      console.log(r.responseText);
    };
    r.send('');
  }

  render() {
    return (
      <h1>Projects</h1>
    );
  }
}

ReactDOM.render(<Projects />, document.getElementById('projects'));