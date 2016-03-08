var gulp = require('gulp'),
  browserSync = require('browser-sync').create();

var fs = require('fs');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp');

// Config
var config = require('./gulp.json');


gulp.task('serve', ['less'], function() {
    browserSync.init({
        proxy: 'lh:8081',
        startPath: '/z_ep/ep'
    });

    gulp.watch('src/eganovo_pokrova/theme5/theme/styles/*.less', ['less']);
    gulp.watch(['src/eganovo_pokrova/theme5/theme/styles/*',
                'src/eganovo_pokrova/theme5/theme/*'])
      .on('change', browserSync.reload);
});
