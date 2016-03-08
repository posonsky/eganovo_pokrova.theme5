var gulp = require('gulp'),
  less = require('gulp-less'),
  sourcemaps = require('gulp-sourcemaps'),
  // path = require('path'),
  // symlink = require('gulp-symlink'),
  // rename = require('gulp-rename'),
  // gulpSequence = require('gulp-sequence'),
  rte = require('gulp-rte');


var config = require('../gulp.json');

var mainLess = config.theme + config.srcs.less,
  dstLess = config.theme + config.dsts.styles,
  srcCss = dstLess + '/' + config.sourceCss,
  tgtCss = dstLess + '/' + config.targetCss;

/*
.pipe(less({
      paths: [ path.join(__dirname) ]
    }))
*/

/*
gulp.task('less-compile', function () {
  return gulp.src(mainLess)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dstLess));
});

gulp.task('less-rename', function () {
  return gulp.src(srcCss)
    .pipe(rename(tgtCss))
    .pipe(gulp.dest('./'));
});

gulp.task('less', gulpSequence('less-compile', 'less-rename'));
*/

gulp.task('less', function () {
  return gulp.src(mainLess)
    .pipe(rte(config.targetCss))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dstLess));
});


/*
gulp.task('less',  'less-compile', function() {
  return gulp.src('src/eganovo_pokrova/theme5/theme/styles/main.css')
    .pipe(symlink('src/eganovo_pokrova/theme5/theme/styles/theme5-compiled.css',
                  {force: true}));
});
*/
