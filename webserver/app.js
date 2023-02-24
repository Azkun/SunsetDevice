import express from 'express'
import chalk from 'chalk'
import path from 'path'

import http from 'http'

import { fileURLToPath } from 'url';
import { Server } from 'socket.io'

const app = express();
const port = 3000;

const server = http.createServer(app)
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getlog(name, user, hostname, additional = "content_query=" + undefined) {
    var add = " - "
    if (additional == "content_query=" + undefined) {
        add = ""
        additional = ""
    }
    console.log("[" + chalk.green("GET Request") + "] - From " + chalk.blueBright(user) + " - To " + chalk.blueBright.underline(hostname + ":" + port + name) + add + additional)
}

app.get('/', function (req, res) {
    getlog("/", req.ip, req.hostname)
    res.type("html")
    res.sendFile(path.join(__dirname, "/front-end/index.html"))
});

app.get('/request', function (req, res) {
    getlog("/request", req.ip, req.hostname, "content_query=" + req.query.content)
    res.status(200)
    res.type("application/json")
    res.send({ content: req.query.content, status: 200 })
    io.emit('request',req.query.content)
})


app.use(express.static(path.join(__dirname, '/front-end/')));
server.listen(port, () => {
    console.log("[" + chalk.blueBright("Launching") + "] - App listening on port " + chalk.magenta(port))
})

