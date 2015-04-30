var through = require('through2');

var upper = through(function (chunk, encoding, callback) {
    this.push(chunk);
    callback(null, '------\n');
});

process.stdin.pipe(upper).pipe(process.stdout);
