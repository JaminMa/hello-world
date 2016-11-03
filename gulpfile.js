'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var del = require('del');
var rename = require('gulp-rename');

var sourceDir = 'src/';
var destDir = 'public/';

var isProduction = process.env.ENVIRONMENT === 'production';

gulp.task('default', ['build-html', 'build-js', 'build-css']);

gulp.task('clean', function(){
  return del([destDir + '**/*']);
});

gulp.task('build-html', function() {
  var useref = require('gulp-useref');
  del.sync([destDir + '**/*.html']);
  return gulp.src('index.html')
  .pipe(gulpif(isProduction, useref({ noAssets: true })))
  .pipe(gulp.dest(destDir));
});

gulp.task('build-js', function() {
  var browserify = require('browserify');
  var source = require('vinyl-source-stream');
  var buffer = require('vinyl-buffer');
  var uglify = require('gulp-uglify');
  del.sync([destDir + '**/*.js']);
  return browserify({
      entries: [sourceDir + 'js/main.js'],
      debug: !isProduction
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulpif(isProduction, buffer()))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulpif(isProduction, rename('bundle.min.js')))
    .pipe(gulp.dest(destDir));
});

gulp.task('build-css', function() {
  var sourcemaps = require('gulp-sourcemaps');
  var sass = require('gulp-sass');
  var postcss = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');
  var cleanCSS = require('gulp-clean-css');
  del.sync([destDir + '**/*.css']);
  return gulp.src(sourceDir + 'scss/**/*.scss', {base: '.'})
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulpif(isProduction, cleanCSS()))
    .pipe(gulpif(isProduction, concat('styles.min.css'), concat('styles.css')))
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest(destDir));
});
