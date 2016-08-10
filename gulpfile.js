var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('default', ['serve']);

gulp.task('build', function() {
  browserify({
    entries: ['./src/js/main.js'],
    debug: true
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./'));
