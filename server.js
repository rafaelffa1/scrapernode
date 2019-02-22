var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', async (req, res) => {

  res.setHeader('Content-Type', 'text/html');
  url = 'http://www.nowgoal.com/sitemap.html';

  links = [];

  await request(url, async (error, response, html) => {

    if (!error) {
      var $ = cheerio.load(html);

      await $('li').map(function (i, el) {
        const link = $(this).children().first().next().attr('href');
        if (link !== undefined) {
          links.push(link);
        }
      }).get().join(' ');

      console.log(links[0]);

      request('http://www.nowgoal.com' + links[0], function (error, response, html) {

        if (!error) {
          var $ = cheerio.load(html);
          console.log('deu bom');
        } else {
          console.log('Error ao fazer o scrape no news');
        }
        res.send('deu bom');
      })

    } else {
      console.log('Error ao fazer o scrape no sitemap');
    }

  })

})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
