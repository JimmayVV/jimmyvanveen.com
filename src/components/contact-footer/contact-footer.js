import React, { Component } from 'react';
import ProfilePic from './jimmy.vanveen-closeup.png';

export default class ContactFooter extends Component {
  render() {
    return (
      <div className="row">

        <div className="col-4 col-md-3 col-lg-2">
          <img src={ProfilePic} className="img-fluid img-thumbnail rounded-circle profilePic" alt="" />
        </div>

        <div className="col-12 col-md-9 col-lg-10">
          <h3>Contact Me</h3>
              
          <form action="https://formspree.io/jimmy.van.veen@gmail.com" method="POST">

            <div className="row">

              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label htmlFor="contactName">Name</label>
                  <input className="form-control" type="text" id="contactName" name="Name" placeholder="Enter Name" required="true" />
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label htmlFor="emailAddress">Email address</label>
                  <input type="email" className="form-control" id="emailAddress" name="_replyto" placeholder="Enter email" required="true" />
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label htmlFor="contactPhone">Phone Number</label>
                  <input className="form-control" type="tel" id="contactPhone" name="PhoneNum" placeholder="Enter Phone #" required="true" />
                </div>
              </div>

            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="contactMessage">Contact Message</label>
                  <textarea className="form-control" id="contactMessage" name="Message" rows="3"></textarea>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col col-lg-8">
                <input type="hidden" name="_next" value="//www.jimmyvanveen.com?thanks=true" />
                <button className="btn btn-block btn-primary">Contact Me!</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    );
  }
}