'use strict';

// Load gulp and all needed plugins.
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Task to compile scss into css (with sourcemaps), autoprefix and concat.
gulp.task('sass', function () {
  return gulp.src('./src/css/**/*.scss')
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.sourcemaps.write())
    .pipe(plugins.autoprefixer({browsers: ['last 2 versions']}))
    .pipe(plugins.concat('main.css'))
    // .pipe(plugins.minifyCss())
    .pipe(gulp.dest('./src/css/'))
    .pipe(plugins.livereload());
});

// Task to 'hint' js code, uglify and concat.
gulp.task('js', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.uglify())
    .pipe(plugins.concat('main.min.js'))
    .pipe(gulp.dest('./src/js/'))
    .pipe(plugins.livereload());
});

// Watch files for changes.
gulp.task('watch', function () {
  plugins.livereload.listen();
  gulp.watch('./src/css/**/*.scss', ['sass']); // Watch scss files.
  gulp.watch('./src/js/**/*.js', ['js']); // Watch js files.
});

// Default task, run it by typing gulp in CLI mode.
gulp.task('default', ['watch']);
