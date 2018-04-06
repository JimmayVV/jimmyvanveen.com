const fs = require('fs');
const request = require('request');

let token = process.env.GITHUB_TOKEN || 'NULL';
let file = './src/graphql.json';
let options = {
  url: 'https://api.github.com/graphql',
  headers: {
    'User-Agent': 'JimmayVV',
    'Authorization': `token ${token}`
  }
}

request(options, (err, res, body) => {
  if (err) {
    console.log(err);
  } else {
    if (res.statusCode == 200) {
      fs.writeFile(file, body);
    } else {
      console.log('Status code not 200 - it was: ' + res.statusCode);
    }
  }
});