import React, { useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import '../styles/global.css';

import { Header } from '/';

function Layout({ children }) {
  // via static query
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  return (
    <div className="wrap-page">
      <Header
        siteTitle={data.site.siteMetadata.title}
        siteDescription={data.site.siteMetadata.description}
      />

      <>{children}</>
      <footer
        style={{
          padding: '1rem',
          display: 'grid',
          justifyContent: 'center',
          background: 'var(--orange)',
          color: 'var(--black',
        }}
      >
        Marie {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default Layout;
