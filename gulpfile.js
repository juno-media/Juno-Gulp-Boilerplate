
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    csslint = require('gulp-csslint'),
    concat = require('gulp-concat');
    
// css:
gulp.task('sass', function() {
    return gulp.src('css/src/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('css'));
});

// js:
gulp.task('scripts', function() {
  return gulp.src('js/src/*.js')
    .pipe(concat('core.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

// images:
gulp.task('images', function() {
  return gulp.src('images/src/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('images'));
});

// lints:

gulp.task('jshint', function() {
  return gulp.src('js/src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});

gulp.task('csslint', function() {
  gulp.src('css/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});

// testing task
gulp.task('test', function() {
    gulp.start('jshint', 'csslint');
});

// Default task
gulp.task('default', function() {
    gulp.start('sass', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {
  gulp.watch('css/src/**/*.scss', ['sass']);
  gulp.watch('js/src/*.js', ['scripts']);
  gulp.watch('images/src/*', ['images']);
});