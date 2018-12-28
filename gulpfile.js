'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const cssmin = require('gulp-cssmin');
const rigger = require('gulp-rigger');
const browser = require('browser-sync');
const uglify = require('gulp-uglify');
//const minify = require('gulp-minify');


gulp.task('sass', function(){
	return gulp.src('app/**/style.{scss,css}')
	.pipe(sass())
	.pipe(gulp.dest('public'))
});


gulp.task('clear', function(){
	return del('public');
});

gulp.task('js', function(){
	return gulp.src('app/js/*.js')
	//.pipe(uglify())
	.pipe(gulp.dest('public/js/'));
});

gulp.task('copy', function(){
	return gulp.src(['./app/**','!./app/css/**','!./app/js/**','!./app/template/**'])
	.pipe(gulp.dest('public'))
})

gulp.task('assets', function(){
	return gulp.src(['app/template/index.html','app/template/about.html'])
		.pipe(rigger())
		.pipe(gulp.dest('public'))
});

gulp.task('watch', function(){
	gulp.watch('app/css/*.*', gulp.series('sass'));
	gulp.watch('app/js/*.*', gulp.series('js'));
	gulp.watch(['app/images/**/*.*', 'app/images/*.*'], gulp.series('copy'));
	gulp.watch('app/template/*.html', gulp.series('assets'));
});

gulp.task('serve', function(){
	browser.init({
		server:'public',
	});
	browser.watch(['public/**/*.*','public/*.*']).on('change', browser.reload);
})

gulp.task('dev', gulp.series('clear', gulp.parallel('sass', 'assets', 'copy', 'js'), gulp.parallel('watch','serve')));