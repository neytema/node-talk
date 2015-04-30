var fs = require('fs');

module.exports = readJSON;

function readJSON(filepath, callback) {
    fs.readFile(filepath, 'utf8', onreadfile);

    function onreadfile(error, result) {
        if (error) {
            callback(error);
        } else {
            try {
                callback(null, JSON.parse(result));
            } catch (ex) {
                callback(ex);
            }
        }
    }
}
