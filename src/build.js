/* jshint node: true */

'use strict';

var browserify = require('browserify'),
    uglify = require('uglify-js'),
    fs = require('fs'),
    targetDir = '../META-INF/resources/webjars/ethereumjs-lib/poc-8-wip',
    devDest = targetDir + '/ethereumjs.js';

var b = browserify({ standalone: 'ethereum' }),
    devWrite = fs.createWriteStream(devDest);

devWrite.on('close', function () {
var minDest = targetDir + '/ethereumjs.min.js',
    minWrite = fs.createWriteStream(minDest),
    uglified = uglify.minify(devDest);

    minWrite.write(uglified.code);
});

b.add('./index')
    .bundle()
    .pipe(devWrite);

