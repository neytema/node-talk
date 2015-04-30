var fs = require('fs');

fs.readFile('some.json', 'utf8', function (error, result) {
    if (error) {
        console.error(error.stack);
    } else {
        console.log(result);
    }
});

