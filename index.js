var express = require("express");
var app = express();
app.use(express.json());

const webhookData = {};
app.get("/", function (req, res) {
  res.json(webhookData);
});

app.get("/clear", function (req, res) {
  webhookData = {};
  res.json(webhookData);
});

app.post("/", function (req, res) {
  webhookData.headers = req.headers;
  webhookData.body = req.body;
  res.send();
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
