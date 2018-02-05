import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const LocalStorage = 'jimmy-bio';

class Bio extends Component {
  constructor(props) {
    super(props);

    const minutesOld = 15;
    let storage = localStorage.getItem(LocalStorage);
    let then = new Date(Date.now() - (1000 * 60 * minutesOld));

    this.state = {
      name: 'Jimmy Van Veen',
      //subheading: 'Front End Web Developer',
      blurb: 'Jimmy is a passionate front end web developer. He works primarily with React, Webpack, and Vanilla ES6 Javascript, CSS3, and HTML5',
      time: Date.now()
    }

    if (!storage || storage.time < then) {
      console.log('updating Git bio data due to being out of date');
      this.getBioData();
    } else if (storage) {
      this.state.repos = JSON.parse(storage);
    }
  }

  getBioData() {
    let url = `https://api.github.com/users/JimmayVV`;

    let success = (data) => {
      console.log(`Name: ${data.name} | Blurb: ${data.bio}`);
      let newState = {name: data.name, blurb: data.bio, time: Date.now()};
      this.setState(newState);
      localStorage.setItem(LocalStorage, JSON.stringify(newState));
    };

    this.getJson(url, success);
  }

  getJson(url, callback = function(){}, async = true) {
    let bustCache = '?' + new Date().getTime();
    let request = new XMLHttpRequest();
    request.onload = () => {
      if (request.readyState === 4 || request.status === 200) {
        callback(JSON.parse(request.responseText));
      } else {
        console.error('Something went wrong while requesting Bio json');
      }
    };
    request.open('GET', url + bustCache, async);
    //request.responseType = 'json';
    request.send();
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <h2>Front End Web Developer</h2>
        <p>
          {this.state.blurb}
        </p>
        <p>
          <a className="btn btn-lg btn-info" href="/resources/static/jvanveen.pdf" target="_blank">Read my Resume &raquo;</a>
        </p>
      </div>
    );
  }
}

ReactDOM.render(<Bio />, document.getElementById('bio'));