module.exports = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: 'Galway Rain',
    description: 'How often does it rain, really?',
    author: 'moh',
    siteUrl: 'https://galway-rain.netlify.app/',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-smoothscroll',
  ],
};
