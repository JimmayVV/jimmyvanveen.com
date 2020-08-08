import React from 'react';

import Layout from '../components/Layout';

import Projects from "../components/Projects";

// import pic1 from '../assets/images/pic01.jpg';
// import pic2 from '../assets/images/pic02.jpg';
import pic3 from '../assets/images/pic03.jpg';

import JimmyCar from '../assets/images/jimmy_car.png'
import BlogScreenshot from '../assets/images/blog_vscode.jpg'

import config from '../../config';

function IndexPage() {
  return (
    <Layout>
      <section id="banner">
        <div className="inner">
          <div className="logo">
            <span className="icon fa-code"></span>
          </div>
          <h2>{config.heading}</h2>
          <p>{config.subHeading}</p>
        </div>
      </section>

      <section id="wrapper">
        <section id="one" className="wrapper spotlight style1">
          <div className="inner">
            <a
              href="https://members.iracing.com/membersite/member/CareerStats.do"
              target="_blank"
              rel="noopener noreferrer"
              style={{borderRadius: 0}}
              className="image"
            >
              <img src={JimmyCar} style={{borderRadius: 0}} alt="" />
            </a>
            <div className="content">
              <h2 className="major">Watch out for me in sim!</h2>
              <p>
                You can find me in the sim racing a Beta UI (BUI) paint scheme, or if you're lucky,
                you'll find me as one of your AI opponents if you happen to let the BUI create a
                roster for you. Be gentle with me when you find me, and be sure to let me win!
              </p>
              <a
                href="https://members.iracing.com/membersite/member/CareerStats.do"
                target="_blank"
                rel="noopener noreferrer"
                className="special"
              >
                Visit My Member Profile (Membership Required)
              </a>
            </div>
          </div>
        </section>

        <section id="two" className="wrapper alt spotlight style2">
          <div className="inner">
            <a href="/#" className="image">
              <img src={BlogScreenshot} alt="" />
            </a>
            <div className="content">
              <h2 className="major">My Blog</h2>
              <p>
                My blog, documenting basically whatever I feel like. I am intending on using this
                space to document some tricky, non-proprietary patterns I needed to discover/develop
                for my work at iRacing. Some of these patterns are very time sensitive, meaning the
                value may very well be outdated in some not so distant future. Even knowing that this
                I will endeavor to keep the most pertinent blog posts up to date if any minor changes
                occur that would otherwise prevent the topic from keeping fresh.
              </p>
              <a href="/blogs" className="special">
                Learn more
              </a>
            </div>
          </div>
        </section>

        <section id="three" className="wrapper spotlight style3">
          <div className="inner">
            <a href="/#" className="image">
              <img src={pic3} alt="" />
            </a>
            <div className="content">
              <h2 className="major">Our Tech Stack</h2>
              <p>
                Our current tech stack consists of consuming dozens of microservice API's across a persistent
                and secure socket.io websocket tunnel. The core BetaUI application is a complex React & Redux
                architecture, running inside a custom Electron application container in constant communication
                with a locally installed microservice application serving as the portal between the iRacing
                simulation executable, and this web application.
              </p>
              <a
                href="https://www.iracing.com/category/all-news/blog/"
                target="_blank"
                rel="noopener noreferrer"
                className="special"
              >
                Learn more
              </a>
            </div>
          </div>
        </section>

        <Projects />


      </section>
    </Layout>
  );
}

export default IndexPage;
