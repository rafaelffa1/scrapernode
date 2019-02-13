var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  res.setHeader('Content-Type', 'text/html');
  url = 'https://www.imdb.com/title/tt6673768';

  request(url, function(error, response, html){

    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

      $('.title_wrapper').filter(function(){
        var data = $(this);
        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.title = title;
        json.release = release;
      })

      $('.ghost').filter(function(){
        var data = $(this);
        console.log(data);
      })

      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })

    } else {
      console.log('Error ao fazer o scrape');
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('Arquivo Escrito com sucesso - Por favor checar o arquivo the output.json');
    })

    res.send('ver o console console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
