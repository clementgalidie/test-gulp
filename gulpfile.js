// Load all dependencies.
var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Set up a server with livereload.
gulp.task('connect', function () {
	connect.server({
		port: 1337,
		root: './src/',
		livereload: true
	});
})

// Task to compile jade into valid html + minify.
gulp.task('jade', function () {
	return gulp.src('./src/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./src/'))
		.pipe(connect.reload());
})

// Task to compile sass to valid css + autoprefix + minify.
gulp.task('sass', function () {
	return gulp.src('./src/assets/css/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({ browsers: ['last 2 versions'] }))
		.pipe(gulp.dest('./src/assets/css/'))
		.pipe(minify())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('./dist/assets/css/'))
		.pipe(connect.reload());
});

// Task to concat js files + uglify.
gulp.task('js', function () {
	return gulp.src('./src/assets/js/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./src/assets/js/'))
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest('./dist/assets/js/'))
		.pipe(connect.reload());
});

// Task to watch each of the previous tasks.
gulp.task('watch', function () {
	gulp.watch('./src/*.jade', ['jade']);
	gulp.watch('./src/assets/css/*.scss', ['sass']);
	gulp.watch('./src/assets/js/*.js', ['js']);
});

// Default task to run all the process! :D
gulp.task('default', ['connect', 'watch']);