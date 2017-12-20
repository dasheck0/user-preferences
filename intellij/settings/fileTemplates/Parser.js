#parse("File Header.java")
var root = '../../..';
var ParserExecutor = require(root + '/libs/ParserExecutor');
var cheerio = require('cheerio');
var Price = require(root + '/models/Price');
var Meal = require(root + '/models/Meal');

var string_utils = require(root + '/utilities/string_utilities');
var array_utils = require(root + '/utilities/array_utilities');

module.exports = (function () {

    var $ = function (document, element) {
        return document(element);
    };

    var ParserImpl = function () {
    };

    ParserImpl.prototype.execute = function (html, callback) {
        if (html.length == 0) {
            return callback(ParserExecutor.Result.Failure, null, 'Empty html given');
        }

        var $ = cheerio.load(html);        

        callback(ParserExecutor.Result.Success, null, null);
    };

    return ParserImpl;
})();