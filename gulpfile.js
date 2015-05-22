'use strict';

// Load gulp and all needed plugins.
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Task to set up a local server + livereload (without the use of a browser plugin).
gulp.task('connect', function () {
  plugins.connect.server({
    root: '.',
    port: 1337,
    livereload: true
  });
});

// Task to minify html files.
gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(plugins.minifyHtml())
    .pipe(plugins.connect.reload());
});

// Task to compile sass into css files.
gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({ style: 'expanded' }))
    .pipe(plugins.minifyCss())
    .pipe(plugins.sourcemaps.write())
    .pipe(plugins.rename('main.min.css'))
    .pipe(gulp.dest('assets/css/'))
    .pipe(plugins.connect.reload());
});

// Task to uglify js files.
gulp.task('js', function () {
  gulp.src('src/scripts/**/*.js')
    .pipe(plugins.uglify())
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.rename('main.min.js'))
    .pipe(gulp.dest('assets/js/'))
    .pipe(plugins.connect.reload());
});

// Task to watch for file changes.
gulp.task('watch', function () {
  gulp.watch('*.html', ['html']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/scripts/**/*.js', ['js']);
});

// Default task, run it by typing 'gulp' in CLI.
gulp.task('default', ['connect', 'watch']);
