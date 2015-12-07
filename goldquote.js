/* Benjamin Geißler -> Forked from Ron Litzenberger, MIT License */


"use strict";

function goldquote(done){
    var request = require('request');
    var cheerio = require('cheerio');
  request('http://www.goldpriceoz.com/gold-price-europe/', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var a=$('b.gold_font').each(function(i, element){
    	//if (i===18)
    	 return this.nodeType == 3;
		  }).text();
      var regGold = /.*\ ([0-9]{1,4}\.\d{2})\ \ Euro/ig
		  var result = regGold.exec(a);
      if (result) {
        done({ounce: parseFloat(result[1]), gramm: parseFloat(result[1]/28.3495) });
		  }else{
        done(null)
      }
    }
	});
}
module.exports = goldquote;
