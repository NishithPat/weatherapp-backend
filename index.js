const express = require("express");
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9890;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "*" //"Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS");
    next();
});

app.get("/", (req, res) => {
    res.send("Home page");
});

app.get("/weatherdata", (req, res) => {

    const city = req.query.q;
    const units = req.query.units;
    const weatherApiKey = process.env.API_KEY_WEATHER;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${weatherApiKey}`)
        .then(response => response.json())
        .then(response => res.send(response));

});

app.get("/gifdata", (req, res) => {

    const main = req.query.s;
    const giphyApiKey = process.env.API_KEY_GIPHY;

    // console.log(main);

    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${giphyApiKey}&s=${main}&weirdness=${10}`)
        .then(response => response.json())
        .then(response => res.send(response));
});

app.get("/errorgifdata", (req, res) => {

    const giphyApiKey = process.env.API_KEY_GIPHY;

    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${giphyApiKey}&s=error&weirdness=${10}`)
        .then(response => response.json())
        .then(response => res.send(response));

});

app.listen(PORT, () => {
    console.log("server started at port 9890");
})