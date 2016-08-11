'use strict';

var gulp = require('gulp');
var merge = require('merge-stream');
var del = require('del');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('default', ['build']);

gulp.task('build', ['clean'], function() {  
  var makeBundle = browserify({
      entries: ['src/js/main.js'],
      debug: process.env.ENVIRONMENT !== 'production'
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public'));

  var copyIndex = gulp.src('index.html')
    .pipe(gulp.dest('public'));

  return merge(makeBundle, copyIndex);
});

gulp.task('clean', function(){
  return del(['public/**/*']);
});
