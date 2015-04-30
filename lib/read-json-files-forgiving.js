var readJSON = require('./read-json');

module.exports = readJSONFiles;

function readJSONFiles(list, callback) {
    var pending = 0;
    var results = {};
    var warnings = {};

    list.forEach(eachfile);

    function eachfile(filepath) {
        readJSON(filepath, (pending++, onread));

        function onread(error, result) {
            if (error) {
                warnings[filepath] = error;
            } else {
                results[filepath] = result;
            }

            if ( ! --pending) {
                callback(null, results, warnings);
            }
        }
    }
}

