var readJSON = require('./read-json');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

util.inherits(JSONReader, EventEmitter);

exports.readJSONFiles = readJSONFiles;
exports.readJSONFilesForgiving = readJSONFilesForgiving;
exports.JSONReader = JSONReader;

function readJSONFiles(list, callback) {
    var results = {};
    var reader = new JSONReader(list);

    reader.on('error', function (error, filepath) {
        reader.abort();
        callback(error);
    });

    reader.on('data', function (data, filepath) {
        results[filepath] = data;
    });

    reader.on('end', function () {
        callback(null, results);
    });
}


function readJSONFilesForgiving(list, callback) {
    var warnings = {};
    var results = {};
    var reader = new JSONReader(list);

    reader.on('error', function (error, filepath) {
        warnings[filepath] = error;
    });

    reader.on('data', function (data, filepath) {
        results[filepath] = data;
    });

    reader.on('end', function () {
        callback(null, results, warnings);
    });
}

function JSONReader(list) {
    var self = this;
    EventEmitter.call(self);

    self.aborted = false;
    self.abort = _readerAbort;

    process.nextTick(function () {
        _readerStart(list, self);
    });
}

function _readerAbort() {
    this.aborted = true;
    this.emit('abort');
}

function _readerStart(list, reader) {
    var pending = 0;

    if (reader.aborted) return;

    if (list.length) {
        list.forEach(eachfile);
    } else {
        reader.emit('end');
    }

    function eachfile(filepath) {
        readJSON(filepath, (pending++, onread));

        function onread(error, result) {
            if (reader.aborted) return;

            if (error) {
                reader.emit('error', error, filepath);
            } else {
                reader.emit('data', result, filepath);
            }

            if ( ! --pending) {
                reader.emit('end');
            }
        }
    }
}
