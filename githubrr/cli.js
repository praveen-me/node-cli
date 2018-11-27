const readline = require('readline');
const https = require('https');

let username;

const line = readline.createInterface({
  input : process.stdin,
  output : process.stdout
})

let data = '';

line.question('Enter you github username? ', (user) => {
  https.get({
    host: 'api.github.com',
    path: '/users/' + user,
    method: 'GET',
    headers: {'user-agent': 'node.js'}
  }, (res) => {
    console.log(res.statusCode);
    res.on('data', (d) => {
      data = data + d;
    })
    res.on('end', () => {
      data = JSON.parse(data);
      console.log(`Name -----------------> \x1b[31m ${data.name} `);
      console.log(`Public Repos -----------------> ${data.public_repos}`);
      console.log(`Followers -----------------> ${data.followers}`);
      })
  })
})


