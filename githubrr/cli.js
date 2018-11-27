#!/usr/bin/env node

const readline = require('readline');
const https = require('https');
const chalk = require('chalk');
const logUpdate = require('log-update');
const spinner = require('elegant-spinner');
const frame = spinner();

let username;

const line1 = readline.createInterface({
  input : process.stdin,
  output : process.stdout
})

let data = '';

let userData = '';

let isLoading = false;

line1.question(
  chalk.magenta.italic('What do you want to do?\n 1 - Get Single User Info \n 2 - Github User Battle \n\nEnter you reponse -> '), 
  (value) => {
    if(value === '1') {
      console.log(chalk.rgb(76, 175, 80).bold('\n\nYou select => Get Single User Info'));
      line1.question(chalk.rgb(0, 188, 212).bold(`\n\nEnter github user name => `), (user) => {

        isLoading = true;
        let interval;
        
        if(isLoading) {
            interval =  setInterval(function(){
              logUpdate(`
                ${ `Waiting for data for ${user} ${frame()}`}
              `)
            }, 50)
        }
        
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
                userData = JSON.parse(userData);
                isLoading = false;
                if(!isLoading) {
                  clearInterval(interval);
                  // Showing User Data
                  console.log(`\n${chalk.rgb(4, 114, 202).bold(`${userData.name}`)}(${chalk.rgb(4, 114, 202).bold(`${userData.login}`)})`);
                  
                  console.log(`${chalk.rgb(255, 193, 7).bold(`${userData.bio}`)}`);
                  
                  console.log(`\n${chalk.rgb(255, 152, 0).bold('Repositories')}\t\t\t::\t${chalk.magenta.bold(`${userData.public_repos}`)}`);
                  
                  console.log(`\n${chalk.rgb(255, 152, 0).bold('Followers')}\t\t\t::\t${chalk.magenta.bold(`${userData.followers}`)}`);

                  console.log(`\n${chalk.rgb(255, 152, 0).bold('Following')}\t\t\t::\t${chalk.magenta.bold(`${userData.following}`)}`);

                  line1.close();
                }
              })
            })
          })
    } else if(value === '2') {
      console.log(chalk.rgb(76, 175, 80).bold('You select => Github User Battle'));
      console.log('This option is in development');
    } else {
      console.log(chalk.red.bold("Enter correct choice"))
    }
  })



