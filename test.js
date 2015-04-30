// Clear terminal
process.stdout.write('\033c');

/*/
var readJSON = require('./lib/read-json');

readJSON('some.json', onread);
readJSON('notfound.json', onread);
readJSON('parseError.json', onread);

function onread(error, result) {
    console.log();
    if (error) {
        console.error('ERROR:');
        console.error(error.stack);
        console.error();
    } else {
        console.log('RESULT:');
        console.log(result);
        console.log();
    }
}
//*/

/*/
var readJSONFiles = require('./lib/read-json-files');

var files = [
    'some.json',
    'notfound.json',
    'parseError.json'
];

readJSONFiles(files, onread);

function onread(error, result) {
    console.log();
    if (error) {
        console.error('ERROR:');
        console.error(error.stack);
        console.error();
    } else {
        console.log('RESULT:');
        console.log(result);
        console.log();
    }
}
//*/

/*/
var readJSONFilesForgiving = require('./lib/read-json-files');

var files = [
    'some.json',
    'notfound.json',
    'parseError.json'
];

readJSONFilesForgiving(files, onread);

function onread(error, result, warnings) {
    console.log();
    if (error) {
        console.error('ERROR:');
        console.error(error.stack);
        console.error();
    } else {
        console.log('RESULT:');
        console.log(result);
        console.log();
        console.warn('WARNINGS:');
        console.warn(warnings);
        console.warn();
    }
}
//*/

/*/
var readJSONFilesFixed = require('./lib/read-json-files-fixed');

var files = [];

readJSONFilesFixed(files, onread);

function onread(error, result, warnings) {
    console.log();
    if (error) {
        console.error('ERROR:');
        console.error(error.stack);
        console.error();
    } else {
        console.log('RESULT:');
        console.log(result);
        console.log();
        console.warn('WARNINGS:');
        console.warn(warnings);
        console.warn();
    }
}
//*/

/*/
var reader = require('./lib/json-reader');

var files = [
    'some.json',
    'notfound.json',
    'parseError.json'
];

reader.readJSONFiles(files, onread);
reader.readJSONFilesForgiving(files, onread);

function onread(error, result, warnings) {
    console.log();
    if (error) {
        console.error('ERROR:');
        console.error(error.stack);
        console.error();
    } else {
        console.log('RESULT:');
        console.log(result);
        console.log();
        console.warn('WARNINGS:');
        console.warn(warnings);
        console.warn();
    }
}
//*/
