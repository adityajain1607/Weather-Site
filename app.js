const { response } = require("express");
const express = require("express");
const https = require("https"); 
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    
    const query = req.body.cityName;
    const appid =  "ed7eec2b5fbabc0f375cae48c2ad7507";
    const unit =  "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ appid +"&units=" + unit;
    
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data){
            const weather = JSON.parse(data);
            console.log(weather);
            const description = weather.weather[0].description
            const temp = weather.main.temp
            const icon = weather.weather[0].icon
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png" 
            res.write("<p>The Weather is currently " + description + "</p>");
            res.write("<h1>The Temprature in " + query + " is " + temp + "degree celcius.</h1>");
            res.write("<img src =" + imageurl + ">");
            res.send();
        })
    })
})

app.listen(3000, function() {
    console.log("Server on port 3000");
})