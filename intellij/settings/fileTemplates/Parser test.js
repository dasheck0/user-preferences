#parse("File Header.java")

var root = '../../../../..';
var Parser = require(root + '/parsers/${CITY_NAME}/all/Parser');
var ParserExecutor = require(root + '/libs/ParserExecutor');
var should = require('should');
var fs = require('fs');

var Meal = require(root + '/models/Meal');
var Price = require(root + '/models/Price');

describe('${CITY_NAME} parser', function () {

    var parser;
    var executor;

    beforeEach(function () {
        parser = new Parser();
        executor = new ParserExecutor(parser);
    });

    describe('with valid html', function () {
        it('should parse the html and succeed', function (done) {
            var html = fs.readFileSync(process.cwd() + '/test/fixtures/${CITY_NAME}/${CITY_NAME}_complete.html');

            executor.execute(html, function (result, data, error) {
                result.should.equal(ParserExecutor.Result.Success);
                should.not.exist(error);
                should.exist(data);
                
                data.length.should.equal();
                data[0].length.should.equal();

                done();
            });
        });
  
        it('should return meals with proper data', function (done) {
            var html = fs.readFileSync(process.cwd() + '/test/fixtures/${CITY_NAME}/${CITY_NAME}_complete.html');

            executor.execute(html, function (result, data, error) {
                Meal.compare(new Meal({
                    name: '',
                    description: '',
                    flags: [],
                    additives: [],
                    prices: [
                        new Price({ group: 'students', price: 0}),
                        new Price({ group: 'coworkers', price: 0}),
                        new Price({ group: 'guests', price: 0})
                    ]
                }), data[][]).should.equal(true);

                Meal.compare(new Meal({
                    name: '',
                    description: '',
                    flags: [],
                    additives: [],
                    prices: [
                        new Price({ group: 'students', price: 0}),
                        new Price({ group: 'coworkers', price: 0}),
                        new Price({ group: 'guests', price: 0})
                    ]
                }), data[3][8]).should.equal(true);

                done();
            });
        });        

        // The purpose of this test is simply to ensure that the parser does not crash
        // with unknown HTML. Some of them throw errors, which are not unexpected. This is due to the fact
        // that some canteens are closed and therefore the root node is not found. hence the parser throws an
        // error, which is in fact the behaviour we want. Thus no expectations are set in this test.

        it('should parse altenative plans as well', function(done) {
            for(var i = 1; i < ; i ++) {
                var html = fs.readFileSync(process.cwd() + '/test/fixtures/${CITY_NAME}/${CITY_NAME}_alt' + i + '.html');

                executor.execute(html, function (result, data, error) {
                    console.log("Result for ${CITY_NAME} " + i + ": ", result, error);
                });
            }

            done();
        });
    });

    describe('with empty html', function () {
        it('should throw an error', function (done) {
            executor.execute('', function (result, data, error) {
                result.should.equal(ParserExecutor.Result.Failure);
                should.not.exist(data);
                error.should.equal('Empty html given');
                done();
            });
        });
    });
});
