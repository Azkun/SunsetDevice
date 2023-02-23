import express from 'express'
import chalk from 'chalk'
const app = express();
const port = 3000;

function getlog(name,user,hostname) {
    console.log("["+chalk.green("GET Request")+"] - From "+chalk.blueBright(user)+" - To "+chalk.blueBright.underline(hostname+":"+port+name))
}

app.get('/', function(req, res) {
    getlog("/",req.ip,req.hostname)
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log("["+chalk.blueBright("Launching")+"] - App listening on port "+chalk.magenta(port))
})

