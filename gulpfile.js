'use strict';
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('serve', ['sass'], function () {
    browserSync.init({
        proxy: "http://85.255.5.126/zadanie1"
    });
    gulp.watch("sass/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
}); 

gulp.task('sass', () =>
    sass('./sass/**/*.scss', {
        style: 'compressed'
    })
    .on('error', sass.logError)
    // .pipe(sourcemaps.write())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream())
);

gulp.task('default', ['serve']);
