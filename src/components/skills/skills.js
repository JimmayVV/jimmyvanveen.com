import React, { Component } from 'react';

// Static Assets
import Babel        from './logos/babel.svg';
import BootstrapSVG from './logos/bootstrap.svg';
import CSS3         from './logos/CSS3.svg';
import Git          from './logos/git.svg';
import GitHub       from './logos/github.svg';
import HTML5        from './logos/HTML5.svg';
import JavaScript   from './logos/JavaScript.svg';
import jQuery       from './logos/jQuery.svg';
import MongoDB      from './logos/MongoDB.svg';
import NodeJS       from './logos/nodejs.svg';
import ReactJS      from './logos/reactjs.svg';
import Webpack      from './logos/webpack.svg';

// React Component
export default class Skills extends Component {
  logos = [
    { label: 'React',       file: ReactJS },
    { label: 'HTML5',       file: HTML5 },
    { label: 'CSS3',        file: CSS3 },
    { label: 'JavaScript',  file: JavaScript },
    { label: 'Webpack',     file: Webpack },
    { label: 'Babel',       file: Babel },
    { label: 'nodeJS',      file: NodeJS },
    { label: 'Git',         file: Git },
    { label: 'GitHub',      file: GitHub },
    { label: 'MongoDB',     file: MongoDB },
    { label: 'Bootstrap',   file: BootstrapSVG },
    { label: 'jQuery',      file: jQuery },
  ];

  render() {
    return (
      <div className="row skills">
        {this.logos.map((logo) => {
          return (<div className="col-6 col-sm-4 col-lg-2 text-center" key={logo.label}>
            <img src={logo.file} className="img-fluid" data-toggle="tooltop" data-placement="bottom" title={logo.label} alt={logo.label} />
          </div>);
        })}
      </div>
    );
  }
}