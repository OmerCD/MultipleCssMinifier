const express = require('express');
const livereload = require('livereload');
const connectLivereload = require("connect-livereload");
const path = require("path");
const bodyParser = require("body-parser");


const livereloadServer = livereload.createServer();
livereloadServer.watch(path.join(process.cwd(), 'public'));
livereloadServer.server.once("connection", () => {
    setTimeout(() => {
        livereloadServer.refresh("/");
    }, 100);
});

const app = express();
app.use(connectLivereload());
app.use(express.static("public"));
app.use(bodyParser.json({
    limit:"50mb"
}))
const port = 4545;

app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/public/index.html`);
})


app.post("/MinifyCss",(request, response) => {
    console.log(request.body);
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})