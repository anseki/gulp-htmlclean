'use strict';

var gutil = require('gulp-util'),
  through = require('through2'),
  htmlclean = require('htmlclean');

module.exports = function(options) {
  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }
    if (file.isStream()) {
      return callback(new gutil.PluginError('gulp-htmlclean', 'Streaming not supported'));
    }

    file.contents = new Buffer(htmlclean(file.contents.toString(), options));
    callback(null, file);
  });
};
