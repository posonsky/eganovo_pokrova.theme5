var gulp = require('gulp'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify'),
  autoprefixer = require('gulp-autoprefixer'),
  cssimport = require('gulp-cssimport'),
  sourcemaps = require('gulp-sourcemaps'),
  rte = require('gulp-rte');

var config = require('../gulp.json');

var mainScss = config.theme + config.srcs.scss,
  dstStyles = config.theme + config.dsts.styles;


gulp.task('scss', function() {
  return gulp.src(mainScss)
    .pipe(rte(config.targetCss))
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Error: Compiling SCSS.",
        message:"<%= error.message %>"
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle : "compressed",
      includePaths : [ config.modules ],
      outFile : config.targetCss,
      sourceMap : true
    }))
    .pipe(autoprefixer('last 3 versions'))
    //.pipe(sourcemaps.write())
    .pipe(sourcemaps.write('./'))
    .pipe(cssimport({}))
    .pipe(gulp.dest(dstStyles))
    .pipe(notify({
      title: 'SCSS Compiled and Minified succesfully!',
      message: 'scss task completed.'
    }));
});
