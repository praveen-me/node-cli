#!/usr/bin/env node

const readline = require('readline');
const https = require('https');
const chalk = require('chalk');
const logUpdate = require('log-update');
const spinner = require('elegant-spinner');
const frame = spinner();

let username;

const line = readline.createInterface({
  input : process.stdin,
  output : process.stdout
})
  
let isLoading = false;
let interval;

line.question(
  chalk.magenta.italic('What do you want to do?\n 1 - Get Single User Info \n 2 - Github User Battle \n\nEnter you reponse -> '), 
  (value) => {
    if(value === '1') {
      console.log(chalk.rgb(76, 175, 80).bold('\n\nYou select => Get Single User Info'));
      line.question(chalk.rgb(0, 188, 212).bold(`\n\nEnter github user name => `), (user) => {

        isLoading = true;
        let userData = '';
        
        if(isLoading) {
            interval =  setInterval(function(){
              logUpdate(`
                ${ `${chalk.rgb(141, 249, 255).bold(`Waiting for data for ${user} ${frame()}`)}`}
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

                  console.log(`\n${`\u{1F64F}`}\t${chalk.cyan.bold(`Thanks for using.`)}\t${`\u{1F64F}`}\n`);

                  line.close();
                }
              })
            })
          })
    } else if(value === '2') {
      console.log(chalk.rgb(76, 175, 80).bold('You select => Github User Battle'));
      let user1 = '';
      let user2 = '';
      
      line.question(chalk.rgb(0, 188, 212).bold(`\n\nEnter first github user name => `), (user) => {
        isLoading = true;

        if(isLoading) {
          interval =  setInterval(function(){
            logUpdate(`
              ${ `${chalk.rgb(141, 249, 255).bold(`Waiting for data for ${user} ${frame()}`)}`}
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
        }, (response) => {
          response.on('data', (d) => {
            user1 = user1 + d;
          })
          response.on('end', () => {
            user1 = JSON.parse(user1);
            if(user1) {
              line.question(chalk.rgb(0, 188, 212).bold(`\n\nEnter second github user name => `), (user) => {
                https.get({
                  host: 'api.github.com',
                  path: '/users/' + user,
                  method: 'GET',
                  headers: {
                    'user-agent': 'node.js',
                    'content-type' : 'application/json'
                  }
                }, (response) => {
                  response.on('data', (d) => {
                    user2 = user2 + d;
                  })
                  response.on('end', () => {
                    isLoading = false;

                    if(!isLoading) {
                      clearInterval(interval)
                    }
                    
                    user2 = JSON.parse(user2);

                    // Start Battle
                    console.log(`\n${chalk.rgb(139, 195, 74).bold(`Battle: ${user1.login} vs ${user2.login}`)}`)

                    //Display Both User Data
                    console.log(`\n${chalk.rgb(255, 152, 0).bold(`Name\t :: \t${user1.name}`)}\t\t\t${chalk.rgb(255, 152, 0).bold(`Name\t :: \t${user2.name}`)}`)
                    
                    console.log(`\n${chalk.rgb(255, 152, 0).bold(`Repositories\t :: \t${user1.public_repos}`)}\t\t\t${chalk.rgb(255, 152, 0).bold(`Repositories\t :: \t${user2.public_repos}`)}`)
                    
                    console.log(`\n${chalk.rgb(255, 152, 0).bold(`Followers\t :: \t${user1.followers}`)}\t\t\t${chalk.rgb(255, 152, 0).bold(`Followers\t :: \t${user2.followers}`)}`)
                    
                    console.log(`\n${chalk.rgb(255, 152, 0).bold(`Following\t :: \t${user1.following}`)}\t\t\t${chalk.rgb(255, 152, 0).bold(`Following\t :: \t${user2.following}`)}`)

                    if(user1.public_repos > user2.public_repos) {
                      console.log(`${chalk.rgb(255, 152, 0).bold(`\n\nWinner\t ${user1.name}`)}`)
                    } else {
                      console.log(`${chalk.rgb(255, 152, 0).bold(`\n\n\t\t\tWinner\t ${user2.name}`)}`)
                    }
                  })
                })
              })
            }
          })
          return;
        })
      })
    } else {
      console.log(chalk.red.bold("Enter correct choice"))
    }
  })



