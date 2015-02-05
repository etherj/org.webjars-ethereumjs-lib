/* jshint node: true */

'use strict';

var browserify = require('browserify'),
    minify = require('minify'),
    fs = require('fs'),
    targetDir = '../META-INF/resources/webjars/ethereumjs-lib/poc-8-wip',
    //targetDir = '.',
    targetDevFile = targetDir + '/ethereumjs.js';

var b = browserify({ standalone: 'ethereum' }),
    devWS = fs.createWriteStream(targetDevFile),
    minWS = fs.createWriteStream(targetDir + '/ethereumjs.min.js');

b.add('ethereumjs-lib/lib/transaction.js')
    .bundle()
    .pipe(devWS);

minify(targetDevFile, 'stream', function (error, stream) {
    if (error) {
        console.error(error.message);
    }
    else {
        stream.pipe(minWS);
    }
});

