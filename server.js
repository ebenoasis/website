const express = require("express");
const app = express();
const fs = require("fs");
let cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World from express!</h1>");
});

app.get("/surveys", (req, res) => {
  fs.readFile("./surveys.json", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get("/questions", (req, res) => {
  fs.readFile("./questions.json", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});



// for surveys ID
const axios = require("axios");
app.get("/surveys/:id", (req, res) => {
  const endpoint = `https://my-json-server.typicode.com/depth0/survey1/surveys/${req.params.id}`;
  axios
    .get(endpoint)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// for questions ID
app.get("/questions/:id", (req, res) => {
  const endpoint = `https://my-json-server.typicode.com/depth0/survey1/questions/${req.params.id}`;
  axios
    .get(endpoint)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000);
