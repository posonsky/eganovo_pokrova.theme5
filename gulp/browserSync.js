var gulp = require('gulp'),
  browserSync = require('browser-sync').create();

var config = require('../gulp.json');

var styles = config.dsts.styles;


gulp.task('less-build', ['less'], function() {
  return gulp.src(config.theme + 'styles/*.css')
    .pipe(browserSync.stream());
});

gulp.task('scss-build', ['scss'], function() {
  return gulp.src(config.theme + 'styles/*.css')
    .pipe(browserSync.stream());
});

gulp.task('serve', function() {
  browserSync.init({
    proxy: config.browserSync.proxy,
    startPath: config.browserSync.startPath,
    open: false,
  });

  //gulp.watch(config.theme + 'styles/**/*.less', ['less-build']);
  gulp.watch(config.theme + 'styles/**/*.scss', ['scss-build']);

  gulp.watch(config.theme + '*')
    .on('change', browserSync.reload);
});
