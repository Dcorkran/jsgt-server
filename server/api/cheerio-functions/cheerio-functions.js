const cheerio = require('cheerio')

module.exports = {
  parseMarkdown: function(md){
    let $ = cheerio.load(md);
    let parsedHTMLObj = {};
    parsedHTMLObj.title = $('.title').text();
    parsedHTMLObj.summary = $('.summary').text();
    parsedHTMLObj.tags = $('.tags').text();
    parsedHTMLObj.content = $('.content').text();
    return parsedHTMLObj;
  }
};
