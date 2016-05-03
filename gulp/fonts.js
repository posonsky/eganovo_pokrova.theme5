/* eslint-env node */
var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify'),
  del = require('del'),
  flatten = require('gulp-flatten'),
  chmod = require('gulp-chmod'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  gulpSequence = require('gulp-sequence');

var config = require('../gulp.json');

var dstFonts = config.theme + config.dsts.fonts,
  srcFonts = config.fonts.map(function (p) {
    return config.modules + p + '/**/*{eot,otf,svg,ttf,woff,woff2}';
  });

gulp.task('clean:fonts', function () {
  return del(dstFonts + '/*');
});

gulp.task('fonts:copy', ['clean:fonts'], function() {
  return gulp.src(srcFonts)
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Error: Coping fonts.",
        message:"<%= error.message %>"
      })
    }))
    .pipe(flatten())
    .pipe(chmod(644))
    .pipe(gulp.dest(dstFonts))
    .pipe(notify({
      title: 'Fonts coped successfully!',
      message: 'fonts:copy task completed.',
      onLast: true
    }));
});

gulp.task('ttf2woff2', function(){
  gulp.src([dstFonts + '/*.ttf'])
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Error: Making WOFF2 fonts.",
        message:"<%= error.message %>"
      })
    }))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(dstFonts))
    .pipe(notify({
      title: 'WOFF2 fonts made successfully!',
      message: 'ttf2woff2 task completed.',
      onLast: true
    }));
});

gulp.task('fonts', gulpSequence('fonts:copy', 'ttf2woff2'));
