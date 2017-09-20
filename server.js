const express = require('express')
const app = express()
//const config = require('./config')
console.log(process.env.consumerKey)
console.log(process.env.consumerSecret)
console.log(process.env.accessToken)
console.log(process.env.accessTokenSecret)
let Twitter = require('twitter-node-client').Twitter;
let twitter = new Twitter(
  {
      	"consumerKey": process.env.consumerKey ,
      	"consumerSecret": process.env.consumerSecret ,
      	"accessToken": process.env.accessToken ,
      	"accessTokenSecret": process.env.accessTokenSecret
      }
);

let port = process.env.PORT || 1337
var moment = require('moment');
console.log(moment().format("ddd MMM D  ZZ YYYY"));

var error = function (err, response, body) {
  console.log('ERROR [%s]', err);
};
var success = function (data) {
  console.log('Data:  ', data);
};

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)

    // Pass to next layer of middleware
    next();
});

// twitter.getUserTimeline({ screen_name: 'UnownBot', count: '10'}, error, function(data){
//   data = JSON.parse(data)
//   // console.log(JSON.parse(data))
//   data.forEach(function(e){
//     console.log(e.text)
//   })
// });

app.use(express.static('./client'));

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html')
})
app.get('/data', function (req, res) {
  twitter.getUserTimeline({ screen_name: 'UnownBot', count: '15'}, error, function(data){
    var hold = []
    var formedData = JSON.parse(data)
    // console.log(JSON.parse(data))
    // ['Bondi Beach', -33.890542, 151.274856, 4],
    // ['Coogee Beach', -33.923036, 151.259052, 5],
    // ['Cronulla Beach', -34.028249, 151.157507, 3],
    // ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    // ['Maroubra Beach', -33.950198, 151.259302, 1]
    formedData.forEach(function(e,i){
      let split = e.text.split('\n')
      console.log(split)
      let out = [split[0]+split[1], split[3].split(',')[0] , split[3].split(',')[1], i]
      // hold.push({
      //   createdAt: e.created_at,
      //   data : e.text.split('\n')
      // })
      hold.push(out)
    })
    //console.log([hold[0].data[0]+hold[0].data[1]].concat( hold[0].data[3].split(',')) )
    res.send(hold)
  });
})

app.listen(port,function(){
  console.log(`Listening on port ${port}`)
})
