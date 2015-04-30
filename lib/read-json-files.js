var readJSON = require('./read-json');

module.exports = readJSONFiles;

function readJSONFiles(list, callback) {
    var pending = 0;
    var aborted = false;
    var results = {};

    list.forEach(eachfile);

    function eachfile(filepath) {
        readJSON(filepath, (pending++, onread));

        function onread(error, result) {
            if (aborted) return;

            if (error) {
                aborted = true;
                callback(error);
            } else {
                results[filepath] = result;
            }

            if ( ! aborted && ! --pending) {
                callback(null, results);
            }
        }
    }
}
