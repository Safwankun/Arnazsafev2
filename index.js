const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');
const chalkRainbow = require('chalk-rainbow')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

(async () => {

  console.log(chalkRainbow(`
 ▄▄▄       ██▀███   ███▄    █  ▄▄▄      ▒███████▒▒██   ██▒▓██   ██▓▒███████▒
▒████▄    ▓██ ▒ ██▒ ██ ▀█   █ ▒████▄    ▒ ▒ ▒ ▄▀░▒▒ █ █ ▒░ ▒██  ██▒▒ ▒ ▒ ▄▀░
▒██  ▀█▄  ▓██ ░▄█ ▒▓██  ▀█ ██▒▒██  ▀█▄  ░ ▒ ▄▀▒░ ░░  █   ░  ▒██ ██░░ ▒ ▄▀▒░ 
░██▄▄▄▄██ ▒██▀▀█▄  ▓██▒  ▐▌██▒░██▄▄▄▄██   ▄▀▒   ░ ░ █ █ ▒   ░ ▐██▓░  ▄▀▒   ░
 ▓█   ▓██▒░██▓ ▒██▒▒██░   ▓██░ ▓█   ▓██▒▒███████▒▒██▒ ▒██▒  ░ ██▒▓░▒███████▒
 ▒▒   ▓▒█░░ ▒▓ ░▒▓░░ ▒░   ▒ ▒  ▒▒   ▓▒█░░▒▒ ▓░▒░▒▒▒ ░ ░▓ ░   ██▒▒▒ ░▒▒ ▓░▒░▒
  ▒   ▒▒ ░  ░▒ ░ ▒░░ ░░   ░ ▒░  ▒   ▒▒ ░░░▒ ▒ ░ ▒░░   ░▒ ░ ▓██ ░▒░ ░░▒ ▒ ░ ▒
  ░   ▒     ░░   ░    ░   ░ ░   ░   ▒   ░ ░ ░ ░ ░ ░    ░   ▒ ▒ ░░  ░ ░ ░ ░ ░
      ░  ░   ░              ░       ░  ░  ░ ░     ░    ░   ░ ░       ░ ░    
                                        ░                  ░ ░     ░        
                                                  
                                                                                      

By : ${('ARNAZX#9611')}
`));

  const auth = rs.question(chalkRainbow('Token : '));
  console.log('');

  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalk.cyan(`\r[ ${moment().format('HH:mm:ss')} ] Auth Eror !`));

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

      console.log(chalk.magenta(`\r
-  [${moment().format('HH:mm:ss')}]  -
>  ${(`ID By Arnazx : ${country}`)}
>  ${(`USER By Arnazx : ${username}`)}  
>  ${(`TROPHY By Arnazx : ${trophy}`)}  
>  ${(`CROWN By Arnazx : ${crown}`)}
>  ${(`STATUS : Success !!`)}`));
      await sleep(7000);

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Mampus Kena Banned🥴😫 `));
      break;
    }
  }

})();
