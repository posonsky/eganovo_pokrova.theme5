var gulp = require('gulp'),
  requireDir = require('require-dir');

var tasks = requireDir('./gulp');

// Config
var config = require('./gulp.json');


gulp.task('default', ['serve']);
