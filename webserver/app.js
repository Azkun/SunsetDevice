import express from 'express'
import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;

function getlog(name, user, hostname) {
    console.log("[" + chalk.green("GET Request") + "] - From " + chalk.blueBright(user) + " - To " + chalk.blueBright.underline(hostname + ":" + port + name))
}

app.get('/', function (req, res) {
    getlog("/", req.ip, req.hostname)
    res.type("html")
    res.sendFile(path.join(__dirname, "/front-end/index.html"))
});

app.use(express.static(path.join(__dirname, '/front-end/')));
app.listen(port, () => {
    console.log("[" + chalk.blueBright("Launching") + "] - App listening on port " + chalk.magenta(port))
})

