var gulp = require('gulp'),
  requireDir = require('require-dir');

var tasks = requireDir('./gulp');

// Config
var config = require('./gulp.json');

// gulp.task('dev', ['templates', 'styles', 'scripts', 'lint', 'images', 'serve']);

gulp.task('dev', ['scss', 'scripts', 'lint', 'serve']);

gulp.task('build', ['fonts', 'scss', 'scripts']);  // 'images']);
// gulp.task('optimize', ['uncss', 'critical', 'images']);

gulp.task('default', function() {
    gulp.start('dev');
});

//gulp.task('default', ['serve']);
