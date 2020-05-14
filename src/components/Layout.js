import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import '../assets/sass/main.scss';
import Footer from './Footer';
import SideBar from './Sidebar';

const Layout = ({
  children,
  fullMenu,
}) => {
  const [isPreloaded, setIsPreloaded] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsPreloaded(false);
    }, 100);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }, []);


  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Solid State' },
              { name: 'keywords', content: 'site, web' },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <div
            className={isPreloaded ? 'main-body is-preload' : 'main-body'}
          >
            <div id="page-wrapper">
              <SideBar fullMenu={fullMenu} />
              {children}
              <Footer />
            </div>
          </div>
        </>
      )}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
