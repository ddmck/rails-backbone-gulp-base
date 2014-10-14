var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var browserifyHandlebars = require('browserify-handlebars');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var stdlib = require('./stdlib');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

var onError = function (err) {
  gutil.beep();
  console.log(err);
};

gulp.task('sass', function() {
  gulp.src('src/scss/app.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('src/js/app.js')
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(browserify({
        transform: [browserifyHandlebars],
        insertGlobals : true,
        debug : !gulp.env.production
      }))
      // .pipe(uglify())
      .pipe(gulp.dest('./build/js'))
      .pipe(connect.reload());
});

gulp.task('lib', function(){
  return gulp.src(stdlib.files)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('rev', ['sass', 'scripts'], function() {
  return gulp.src(['build/**/*.css', 'build/min/**/*.js'])
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist'));
});

gulp.task('min', function(){
  gulp.src(['build/js/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('build/min/'));
});

gulp.task('watch', ['sass', 'scripts', 'lib'], function() {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.*', ['scripts']);
  gulp.watch('./stdlib.js', ['lib']);
  // gulp.watch()
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: {
      enabled: true,
      port: 35727
    },
    port: 8000
  });
});

gulp.task('default', ['connect', 'watch']);