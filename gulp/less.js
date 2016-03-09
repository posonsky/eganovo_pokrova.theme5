var gulp = require('gulp'),
  less = require('gulp-less'),
  sourcemaps = require('gulp-sourcemaps'),
  rte = require('gulp-rte');

var config = require('../gulp.json');

var mainLess = config.theme + config.srcs.less,
  dstLess = config.theme + config.dsts.styles;


gulp.task('less', function () {
  return gulp.src(mainLess)
    .pipe(rte(config.targetCss))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dstLess));
});
