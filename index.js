const express = require("express");
const fs = require("fs");
const https = require("https");

const { resolve } = require("./solution.js");

const app = express();
const port = 3443;

const privateKey = fs.readFileSync("../../SSL/certs/private.key");
const certificate = fs.readFileSync("../../SSL/certs/certificate.crt");

app.use(express.json());

function makeResponse(text) {
  return {
    fulfillmentMessages: [{ text: { text: [text] } }],
  };
}

function bodyToEntries(body) {
  let malfunctions = body.queryResult.parameters.Malfunction;

  let entries = {};

  if (Array.isArray(malfunctions)) {
    for (let malfunction of malfunctions) {
      entries[malfunction] = true;
    }
  } else {
    entries[malfunctions] = true;
  }
  console.log(entries);
  return entries;
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  const entries = bodyToEntries(req.body);
  const textResponse = resolve(entries);
  const answer = makeResponse(textResponse);
  res.send(answer);
});

https
  .createServer({ key: privateKey, cert: certificate }, app)
  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
