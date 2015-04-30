var through = require('through2');

var upper = through(function (chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
});

process.stdin
    .pipe(upper)
    .pipe(process.stdout);
