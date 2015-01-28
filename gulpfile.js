// Load all dependencies.
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('jade', function () {
	return gulp.src('./src/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./src/'))
})

gulp.task('sass', function () {
	return gulp.src('./src/assets/css/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({ browsers: ['last 2 versions'] }))
		.pipe(gulp.dest('./src/assets/css/'))
		.pipe(minify())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('./dist/assets/css/'));
});

gulp.task('js', function () {
	return gulp.src('./src/assets/js/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./src/assets/js/'))
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest('./dist/assets/js/'))
})

gulp.task('default', function () {
	console.log('Yeah!');
});