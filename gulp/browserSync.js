/* eslint-env node */
var gulp = require('gulp'),
  browserSync = require('browser-sync'); //.create();

var reload = browserSync.reload;

var config = require('../gulp.json');

gulp.task('less-build', ['less'], function() {
  return gulp.src(config.theme + 'styles/*.css')
    .pipe(reload({ stream : true }));
    //.pipe(browserSync.stream());
});

gulp.task('scss-build', ['scss'], function() {
  return gulp.src(config.theme + 'styles/*.css')
    .pipe(reload({ stream : true }));
});

gulp.task('scripts-build', ['scripts'], function() {
  return gulp.src(config.theme + config.dsts.scripts + '/*.min.js')
    .pipe(reload({ stream : true }));
});

gulp.task('serve', function() {
  browserSync.init({
    proxy: config.browserSync.proxy,
    startPath: config.browserSync.startPath,
    open: false
  });

  gulp.watch(config.theme + 'gulp.json', ['scripts-build']);

  //gulp.watch(config.theme + 'styles/**/*.less', ['less-build']);
  gulp.watch(config.theme + config.dsts.styles + '/**/*.scss', ['scss-build']);
  gulp.watch([
      config.theme + config.srcs.js.path + '/**/*.js',
      '!' + config.theme + config.dsts.scripts + '/*.min.js'
    ],
    ['scripts-build']);

  gulp.watch(config.theme + '*')
    .on('change', reload);
});
