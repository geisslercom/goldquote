/* Benjamin Geißler -> Forked from Ron Litzenberger, MIT License */


"use strict";

function goldquote(callback, err) {
    let request = require('request');
    let cheerio = require('cheerio');
    
    request('http://www.goldpriceoz.com/gold-price-europe/', function(error, response, html) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);
            let a = $('.gold-span span:nth-child(3) b').each(function(i, element) {
                //if (i===18)
                return this.nodeType == 3;
            }).text();
            let regGold = /.*\ ([0-9]{1,4}\.\d{2})\ \ Euro/ig
            let result = regGold.exec(a);
            if (result) {
                callback({
                    ounce: parseFloat(result[1]),
                    gramm: parseFloat(result[1] / 31.1034768)
                });
            } else {
                callback(null)
            }
        }
    });
}
module.exports = goldquote;