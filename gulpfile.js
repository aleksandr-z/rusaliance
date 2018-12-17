'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const cssmin = require('gulp-cssmin');
const rigger = require('gulp-rigger');
const browser = require('browser-sync');

gulp.task('sass', function(){
	return gulp.src('app/**/style.scss')
	.pipe(sass())
	.pipe(gulp.dest('public'))
});


gulp.task('clear', function(){
	return del('public');
});

gulp.task('copy', function(){
	return gulp.src(['!css','!js', '!template'])
	.pipe(gulp.dest('public'))
})

gulp.task('assets', function(){
	return gulp.src('app/template/index.html')
		.pipe(rigger())
		.pipe(gulp.dest('public'))
});

gulp.task('watch', function(){
	gulp.watch('app/css/*.*', gulp.series('sass'));
});

gulp.task('serve', function(){
	browser.init({
		server:'public',
	});
	browser.watch('public/**/*.*').on('change', browser.reload);
})

gulp.task('dev', gulp.series('clear', gulp.parallel('sass', 'assets'), gulp.parallel('watch','serve')));