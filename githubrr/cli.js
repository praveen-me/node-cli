#!/usr/bin/env node

const readline = require('readline');
const https = require('https');
const chalk = require('chalk');


let username;

const line1 = readline.createInterface({
  input : process.stdin,
  output : process.stdout
})

let data = '';

// line.question('Enter you github username? ', (user) => {
//   https.get({
//     host: 'api.github.com',
//     path: '/users/' + user,
//     method: 'GET',
//     headers: {'user-agent': 'node.js'}
//   }, (res) => {
//     res.on('data', (d) => {
//       data = data + d;
//     })
//     res.on('end', () => {
//       data = JSON.parse(data);
//       console.log(`Name -----------------> \x1b[31m ${data.name} `);
//       console.log(`Public Repos -----------------> ${data.public_repos}`);
//       console.log(`Followers -----------------> ${data.followers}`);
//       })

//       line.close();
//   })
// })


let userData = '';

line1.question(
  chalk.magenta.italic('What do you want to do?\n 1 - Get Single User Info \n 2 - Github User Battle \n\nEnter you reponse -> '), 
  (value) => {
    if(value === '1') {
      console.log(chalk.rgb(76, 175, 80).bold('\n\nYou select => Get Single User Info'));

      line1.question(chalk.rgb(0, 188, 212).bold(`\n\nEnter github user name => `), (user) => {
        https.get({
              host: 'api.github.com',
              path: '/users/' + user,
              method: 'GET',
              headers: {
                'user-agent': 'node.js',
                'content-type' : 'application/json'
              }
            }, (res) => {
              res.on('data', (d) => {
                userData = userData + d;
              })
              res.on('end', () => {
                let data;
                data = JSON.parse(userData);
                console.log(data)
                })
            })
          })
    } else if(value === '2') {
      console.log(chalk.rgb(76, 175, 80).bold('You select => Github User Battle'))
    } else {
      console.log(chalk.red.bold("Enter correct choice"))
    }

    // line1.close();
  })



