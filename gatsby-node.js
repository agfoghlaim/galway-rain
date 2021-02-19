const fetch = require('isomorphic-fetch');
const path = require('path');

async function fetchRainyDays() {
  const url = 'https://irish-apis.netlify.app/weather/api';

 //const url = 'http://localhost:3000/graphql';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      query: `
        query {
          dailyData(station: ATHENRY) {
            date
            rain
          }
        }
      `,
    }),
  });
  const ans = await res.json();

  return ans.data.dailyData;
}

module.exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  // Rainy Days
  const rainyDays = await fetchRainyDays();
 
  rainyDays.forEach((rainyDay, i) => {
    const rainyDayMeta = {
      id: createNodeId(`day-${rainyDay.date}`),
      parent: null,
      children: [],
      internal: {
        type: 'RainyDay',
        mediaType: 'application/json',
        contentDigest: createContentDigest(rainyDay),
      },
    };
    actions.createNode({
      ...rainyDay,
      ...rainyDayMeta,
    });
  });

};
