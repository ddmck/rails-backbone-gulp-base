var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
 
gulp.task('sass', function() {
  return gulp.src('src/scss/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('src/js/app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/js'))
});

gulp.task('watch', ['sass', 'scripts'], function() {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['scripts']);
});