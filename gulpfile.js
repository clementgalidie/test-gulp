'use strict';

// Load gulp and all needed plugins.
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var baseFolders = {
  dev: 'src/',
  dist: 'dist/'
};

var devFolders = {
  css: baseFolders.dev + 'css/',
  js: baseFolders.dev + 'js/'
};

var distFolders = {
  css: baseFolders.dist + 'css/',
  js: baseFolders.dist + 'js/'
};

// Task to set up a local server + livereload (without the use of a browser plugin).
gulp.task('connect', function () {
  plugins.connect.server({
    root: 'src/',
    port: 1337,
    livereload: true
  });
});

// Task to lint html files.
gulp.task('html', function () {
  return gulp.src(baseFolders.dev + '*.html')
    .pipe(plugins.minifyHtml())
    .pipe(plugins.connect.reload());
});

// Task to compile sass into css files.
gulp.task('sass', function () {
  return gulp.src(devFolders.css + 'sass/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({ style: 'expanded' }))
    .pipe(plugins.minifyCss())
    .pipe(plugins.sourcemaps.write())
    .pipe(plugins.rename('main.min.css'))
    .pipe(gulp.dest(devFolders.css))
    .pipe(plugins.connect.reload());
});

// Task to uglify js files.
gulp.task('js', function () {
  gulp.src(devFolders.js + 'scripts/**/*.js')
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename('main.min.js'))
    .pipe(gulp.dest(devFolders.js))
    .pipe(plugins.connect.reload());
});

// Task to watch for file changes.
gulp.task('watch', function () {
  gulp.watch(baseFolders.dev + '*.html', ['html']);
  gulp.watch(devFolders.css + '**/*.scss', ['sass']);
  gulp.watch(devFolders.js + '**/*.js', ['js']);
});

// Default task, run it by typing 'gulp' in CLI.
gulp.task('default', ['connect', 'watch']);
