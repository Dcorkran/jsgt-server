var express = require('express');
var router = express.Router();
var rp = require('request-promise');
const GITHUB_URL = 'https://api.github.com/repos/Dcorkran/js-game-tutorials/contents/tutorial-markdowns';
const marked = require('marked');
const cheerioFunctions = require('../cheerio-functions/cheerio-functions')
require('dotenv').config();



/* GET home page. */
router.get('/:name', function(req, res, next) {

  var options = {
    uri: `${GITHUB_URL}/${req.params.name}.md?${process.env.ACCESS_TOKEN}`,
    headers: {
      'Accept': 'application/vnd.github.VERSION.raw',
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };


  rp(options)
      .then(function (repos) {
        console.log(repos);

        let parsedObj = cheerioFunctions.parseMarkdown(repos);
        parsedObj.content = marked(parsedObj.content);
        console.log(parsedObj);
        res.json(parsedObj);
      })
      .catch(function (err) {
        console.log(err);
        res.json("boo");
          // API call failed...
      });
});

module.exports = router;
