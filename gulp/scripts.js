/* eslint-env node */
var gulp = require('gulp'),
  gulpif = require('gulp-if'),
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify'),
  sourcemaps = require('gulp-sourcemaps'),
  rte = require('gulp-rte'),
  del = require('del'),
  eslint = require('gulp-eslint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  replace = require('gulp-string-replace'),
  lazypipe = require('lazypipe'),
  wrapJS = require("gulp-wrap-js");

var config = require('../gulp.json');

var dstScripts = config.theme + config.dsts.scripts,
  srcJS = config.srcs.js.modules.map(function (js) {
    return config.theme + js;
  }),
  includesJS = config.srcs.js.includes.map(function (js) {
    return config.modules + js;
  }),
  allJS = includesJS.concat(srcJS);

/* Scripts (js) ES6 => ES5, minify and concat into a single file.*/
gulp.task('clean:scripts', function () {
  return del(dstScripts + '/*.min.js');
});

var jsTether = lazypipe()
  .pipe(babel)
  .pipe(concat, '_tether.js')
  .pipe(
    wrapJS,
    'define(\'tether\', [], function () {%= body % \nreturn Tether;});'
  );

var isTether = function (file) {
  return file.path.match(/tether/g) ?  true : false;
};

var jsBootstrap = lazypipe()
  .pipe(babel)
  .pipe(replace, 'window.Tether', 'Tether')
  .pipe(
    wrapJS,
    'require([\'jquery\', \'tether\'], function($, Tether) {%= body %});'
  );

var isBootstrap = function (file) {
  return file.path.match(/bootstrap/g) ?  true : false;
};

gulp.task('scripts', ['clean:scripts'], function() {
  return  gulp.src(allJS)
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Error: JS bundle making failed.",
        message:"<%= error.message %>"
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(gulpif(isTether, jsTether()))
    .pipe(gulpif(isBootstrap, jsBootstrap()))
    .pipe(concat(config.srcs.js.bundle + '-bundle.js'))
    .pipe(rte(':basename.min:ext'))
    .pipe(uglify({
      preserveComments : false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dstScripts))
    .pipe(notify({
      title: 'JavaScript Minified and Concatenated!',
      message: 'your JS files has been minified and concatenated.'
    }));
});

/* Lint, lint the JavaScript files */
gulp.task('lint', function() {
  return gulp.src(config.theme + config.dsts.path + '/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
