var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify'),
  del = require('del'),
  flatten = require('gulp-flatten'),
  chmod = require('gulp-chmod');

var config = require('../gulp.json');

var dstFonts = config.theme + config.dsts.fonts,
  srcFonts = config.fonts.map(function (p) {
    return config.modules + p + '/**/*{eot,otf,svg,ttf,woff,woff2}';
  });

gulp.task('clean:fonts', function () {
  return del(dstFonts);
});

gulp.task('fonts', ['clean:fonts'], function() {
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
      message: 'fonts task completed.',
      onLast: true,
    }));
});
