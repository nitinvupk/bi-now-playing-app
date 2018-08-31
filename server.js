const express = require('express');
var Twitter = require('twitter');
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));

var client = new Twitter({
  consumer_key: 'CXVNsTDohsJaIxl0cjpuLKXYr',
  consumer_secret: 'Y49dNi2NPN9vJaPS95QnRLslOqisEuC7v934lHOfN05cVjbtDB',
  access_token_key: '2834545563-QYQqm8hnLPiU3eFyAD8SGtKhfIYW7gMp8fGh8Xd',
  access_token_secret: 'SUquQt3XC2ve3IIa8JbwMa4bsRCpZSJuCVKYAXLUTDBBT'
});

app.get('/api/tweets', (req, res) => {
  // for searching tweets with the geocodes
  const geocode = `${req.query.lat} ${req.query.lon} 10mi`;
  var params = {q: 'nowplaying', count: 50 };
  client.get('search/tweets', params, (error, tweets, response) => {
    if(error) throw error;
    res.send({ tweets: tweets });
  });
});

app.post('/api/tweet', (req, res) => {
  const params = {
    status: req.body.comment + " #nowplaying " + req.body.url,
    lat: req.body.lat,
    long: req.body.lon,
    display_coordinates: true
  };
  client.post('statuses/update', params, (error, tweet, response) => {
    console.log(error, tweet);
    if(error) throw error;
    res.send({ tweet: tweet });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
