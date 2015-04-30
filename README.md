# Node Talk

This talk will be focused on several issues related to code implementations that uses asynchronous callbacks.

If you are new to the whole [Node.js®](https://nodejs.org) stuff I can recommend [Mixu's Node book](http://book.mixu.net/node/index.html) a short condensed book about things You need to know.

For further reading I can recommend [The 4 keys to 100% uptime with Node.js](http://engineering.fluencia.com/blog/2013/12/20/the-4-keys-to-100-uptime-with-nodejs) blog post about application error handling and graceful process termination.

## Blocking Code

[Blocking code example](lib/blocking-code.js) shows how javascript runtime behaves in several situations. And displays difference between `process.nextTick` and `setImmediate`.

## Read JSON file method with callback

[Read JOSN file code example](lib/read-json.js) shows how callback supported function can be implemented. Example shows how error from `readFile` is passed thru to callback and new possible `JSON.parse` exception is handled.

```javascript
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
```

## Read multiple JSON files

[Read JOSN files code example](lib/read-json-files.js) shows common pattern with multiple parallel async I/O calls, where execution is finished then all pending jobs are done (`pending` value goes to zero). In addition to that execution is stopped if error occurs on any of currently read files and first error is passed to callback.

```javascript
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
```

## Error-agnostic read multiple JSON files

[Read JOSN files code example](lib/read-json-files-forgiving.js) demonstrates situation where callback can receive third argument as additional information object. All errors occurred when reading files are collected to `warnings` object and passed as third argument to callback.

In this example callback will never receive first `error` argument.

```javascript
var readJSONFilesForgiving = require('./lib/read-json-files-forgiving');

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
```

## Fixed read multiple JSON files

Previous examples has common callback handling mistake of not handling 'requested nothing - do nothing' situation. If you pass empty array to `readJSONFiles` function callback never be called and execution of program will stop without any notice or farewell.

This issue is fixed in [following example](lib/read-json-files-fixed.js) where if empty file list is passed callback is called on process next tick. This is done this way because callback is expected to fire after synchronous code finishes.

```javascript
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
```

## Refactoring by using EventEmitter

[Example](lib/json-reader.js) shows how both `readJSONFiles` and `readJSONFilesForgiving` can be implemented by using extended `EventEmitter` object with `abort` method.

Helper functions reduced to `JSONReader` instance creation and several event listeners. Previously discussed code is moved to `_readerStart` function and changed to accept `JSONReader` object instead of callback.

Example also shows common practice of delaying code execution in `JSONReader` constructor by using `process.nextTick`. This is done to prevent any events to be triggered before event listeners are attached to object.

```javascript
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
```

# Streams

[Streams in node](https://nodejs.org/api/stream.html) deserves separate talk. The idea of stream is based upon Unix Shell Script '|' (pipe) operator. [streem-upper](lib/streem-upper.js) and [streem-hr](lib/streem-hr.js) examples shows two simple transform stream implementations that can be run `node lib/stream-upper | lib/stream-hr` together.
