import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default function SEO({
  children,
  location,
  description,
  pageTitle,
  image,
}) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{pageTitle}</title>

      {/* not sure the svg is ever showing */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternative icon" href="/favicon.ico" />

      <meta name="viewport" content="width=device-width, initial-scle=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      {location && <meta property="ob:url" content={location.href} />}
      <meta property="og:image" content={image || '/favicon.svg'} />
      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={description} key="ogdesc" />
      {children}
      {/* children is so we can use eg. <SEO>
        <title>some override</title>
      </SEO> */}
    </Helmet>
  );
}