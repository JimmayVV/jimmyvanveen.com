import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime';

function fetchQuery(operation, variables) {
  let token = process.env.NODE_ENV === 'development' ?
    process.env.REACT_APP_GRAPHQL_TOKEN :
    process.env.REACT_APP_GRAPHQL_TOKEN1 + process.env.REACT_APP_GRAPHQL_TOKEN2;

  console.log(token);

  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'User-Agent': 'JimmayVV',
      'Authorization': `token ${token}`
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

export default new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});