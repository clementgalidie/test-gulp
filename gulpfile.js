'use strict';

// Load gulp and all needed plugins.
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// This task'll set up a local server with livereload (without the use of a plugin).
gulp.task('connect', function () {
  plugins.connect.server({
    root: './src/',
    port: 1337,
    livereload: true
  });
});

// Task to livereload HTML and minify.
gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(plugins.minifyHtml())
    .pipe(gulp.dest('./dist/'))
    .pipe(plugins.connect.reload());
});

// Task to compile scss into css (with sourcemaps), autoprefix, concat and minify.
gulp.task('sass', function () {
  return gulp.src('./src/css/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(plugins.concat('main.css'))
    .pipe(plugins.minifyCss())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('./src/css/'))
    .pipe(plugins.connect.reload());
});

// Task to 'hint' js code, uglify and concat.
gulp.task('js', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.uglify())
    .pipe(plugins.concat('main.min.js'))
    .pipe(gulp.dest('./src/js/'))
    .pipe(plugins.connect.reload());
});

// Watch files for changes.
gulp.task('watch', function () {
  gulp.watch('./src/*.html', ['html']); // Watch html files.
  gulp.watch('./src/css/**/*.scss', ['sass']); // Watch scss files.
  gulp.watch('./src/js/**/*.js', ['js']); // Watch js files.
});

// Default task, run it by typing 'gulp' in CLI mode.
gulp.task('default', ['connect', 'watch']);
