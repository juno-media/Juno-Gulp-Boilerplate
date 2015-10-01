
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    sourcemaps  = require('gulp-sourcemaps'),
    cache = require('gulp-cache'),
    csslint = require('gulp-csslint'),
    concat = require('gulp-concat');
    
// css:
gulp.task('sass', function() {
    return gulp.src('public/assets/css/src/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('css'));
});

// js:
gulp.task('scripts', function() {
  return gulp.src('public/assets/js/src/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('core.js'))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: 'public/assets/js/src/*.js'}))
    .pipe(gulp.dest('js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

// images:
gulp.task('images', function() {
  return gulp.src('images/src/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, multipass: true, svgoPlugins: [{removeViewBox: false}] })))
    .pipe(gulp.dest('images'));
});

// lints:

gulp.task('jshint', function() {
  return gulp.src('public/assets/js/src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});

gulp.task('csslint', function() {
  gulp.src('public/assets/css/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});

// Watch
gulp.task('watch', function() {
  gulp.watch('public/assets/css/src/**/*.scss', ['sass']);
  gulp.watch('public/assets/js/src/*.js', ['scripts']);
  gulp.watch('images/src/*', ['images']);
});


// testing task
gulp.task('test', function() {
    gulp.start('scripts', 'jshint', 'sass', 'csslint');
});

// Default task
gulp.task('default', function() {
    gulp.start('sass', 'scripts', 'images', 'watch');
});

