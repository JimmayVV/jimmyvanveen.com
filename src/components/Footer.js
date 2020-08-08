import React from 'react';
import config from '../../config';
export default function Footer() {
  return (
    <section id="footer">
      <div className="inner">
        <h2 className="major">Get in touch</h2>
        <p>
          If you would like to get in touch with me, you may feel free to contact me
          via this web form below. I cannot guarantee I will promptly respond, as I am
          not currently soliciting employment opportunities, and life with a toddler
          can be quite hectic!
        </p>
        <form method="post" action="https://formspree.io/jimmy.van.veen@gmail.com">
          <div className="fields">
            <div className="field">
              <label htmlFor="Name">Name</label>
              <input type="text" name="Name" id="Name" />
            </div>
            <div className="field">
              <label htmlFor="_replyto">Email</label>
              <input type="email" name="_replyto" id="_replyto" />
            </div>
            <div className="field">
              <label htmlFor="PhoneNum">Phone Number</label>
              <input type="tel" name="PhoneNum" id="PhoneNum" />
            </div>
            <div className="field">
              <label htmlFor="Message">Message</label>
              <textarea name="Message" id="Message" rows="4"></textarea>
            </div>
          </div>
          <ul className="actions">
            <li>
              <input type="submit" value="Send Message" />
            </li>
          </ul>
        </form>
        <ul className="contact">
          <li className="fa-home">{config.address}</li>

          {config.socialLinks.map(social => {
            const { icon, url } = social;
            return (
              <li className={`${icon}`} key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
              </li>
            );
          })}
        </ul>
        <ul className="copyright">
          <li>&copy; Jimmy Van Veen. All rights reserved.</li>
          <li>
            Design modified from <a href="http://html5up.net">HTML5 UP</a>
          </li>
        </ul>
      </div>
    </section>
  );
}
